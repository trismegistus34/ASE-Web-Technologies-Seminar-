import express from 'express';
import sequelize from './sequelize.js'
import Student from './models/student.js';
import University from './models/university.js';
import Course from './models/course.js';

const app = express();
const port = 3000;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

University.hasMany(Student);
University.hasMany(Course);
Student.belongsToMany(Course, {through: "enrollements"});
Course.belongsToMany(Student, {through: "enrollements"});

// Kickstart the Express aplication
app.listen(port, () => {
  console.log("The server is running on http://localhost:" + port);
});

// Create a middleware to handle 500 status errors.
app.use((err, req, res, next) => {
  console.error("[ERROR]:" + err);
  res.status(500).json({ message: "500 - Server Error" });
});

/**
 * Create a special GET endpoint so that when it is called it will
 * sync our database with the models.
 */
app.get("/create", async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });
    res.status(201).json({ message: "Database created with the models." });
  } catch (err) {
    next(err);
  }
});

/**
 * GET all the universities from the database.
 */
app.get("/universities", async (req, res, next) => {
  try {
    const universities = await University.findAll();
    res.status(200).json(universities);
  } catch (err) {
    next(err);
  }
});

/**
 * POST a new university to the database.
 */
app.post("/university", async (req, res, next) => {
  try {
    await University.create(req.body);
    res.status(201).json({ message: "University Created!" });
  } catch (err) {
    next(err);
  }
});

/**
 * GET all students.
 */
app.get("/students", async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
});

/**
 * POST a new student into a university.
 */
app.post("/universities/:universityId/students", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (university) {
      const student = new Student(req.body);
      student.universityId = university.id;
      await student.save();
      res.status(201).json({ message: 'Student crated!'});
    } else {
      res.status(404).json({ message: '404 - University Not Found'});
    }
  } catch (error) {
    next(error);
  }
});

/**
 * GET all the students from a university using include.
 */
app.get("/universities/:universityId/students", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId, {
      include: [Student]
    });
    if (university) {
      res.status(200).json(university.students);
    } else {
      res.status(404).json({ message: '404 - University Not Found!'});
    }
  } catch(error) {
    next(error);
  }
});

/**
 * PUT in order to update a student from a university.
 */
app.put("/universities/:universityId/students/:studentId", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (university) {
      const stundents = await university.getStudents({ id: req.params.studentId });
      const student = stundents.shift();
      if (student) {
        student.studentFullName = req.body.fullName;
        student.studentStatus = req.body.status;
        await student.save();
        res.status(202).json({ message: 'Student updated!' });
      } else {
        res.status(404).json({ message: '404 - Student Not Found!'});
      }
    } else {
      res.status(404).json({ message: '404 - University Not Found!'});
    }
  } catch (error) {
    next(error);
  }
});

// GET a specific student from a specific university
app.get('/universities/:universityId/students/:studentId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const students = await university.getStudents({ id: req.params.studentId })
      const student = students.shift()
      if (student) {
        res.status(202).json(student)
      } else {
        res.status(404).json({ message: '404 - Student Not Found!' })
      }
    } else {
      res.status(404).json({ message: '404 - University Not Found!' })
    }
  } catch (err) {
    next(err);
  }
});

// DELETE student from a university
app.delete('/universities/:universityId/students/:studentId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const students = await university.getStudents({ id: req.params.studentId })
      const student = students.shift()
      if (student) {
        await student.destroy()
        res.status(202).json({ message: 'Student deleted!'})
      } else {
        res.status(404).json({ message: '404 - Student Not Found' })
      }
    } else {
      res.status(404).json({ message: '404 - University Not Found!' })
    }
  } catch (err) {
    next(err);
  }
});

// GET enrollments for a student
app.get('/universities/:universityId/students/:studentId/enrollments', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const students = await university.getStudents({ id: req.params.studentId })
      const student = students.shift()
      if (student) {
        const courses = await student.getCourses({attributes: ['id']});
        if (courses.length > 0) {
          res.status(202).json(courses);
        } else {
          res.status(204).json({message: "204 - No Courses Found"});
        }
      }
      else {
        res.status(404).json({ message: '404 - Student Not Found' })
      }
    }
    else {
      res.status(404).json({message: '404 - University Not Found!'});
    }
  }
  catch (err) {
    next(err);
  }
});

//Export as array of universities containing student list and course list
app.get('/', async (req, res, next) => {
  try {
    const result = [];
    for (let u of await University.findAll()) {
      const university = {
        name: u.name,
        students: [],
        courses: [],
        enrollements: []
      };
      for (let c of await u.getCourses()) {
        university.courses.push({
          key: c.id,
          name: c.name
        });
        for (let s of await c.getStudents()) {
          university.enrollements.push({
            courseKey: c.id,
            studentKey: s.id
          });
        }
      }
      for (let s of await u.getStudents()) {
        university.students.push({
          key: s.id,
          firstName: s.firstName,
          lastName: s.lastName
        });
      }
      result.push(university);
    }
    if (result.length > 0) {
      res.status(202).json(result);
    } else {
      res.status(204).json({message: "204 - No Data Found"});
    }
  } catch (error) {
    next(error);
  }
});