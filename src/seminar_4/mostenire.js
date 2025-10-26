class Software {
    constructor(name) {
        this.name = name;
    }

    run() {
        console.log("Soft-ul " + this.name + " ruleaza.");
    }
}

class Plugin {
    constructor(name) {
        this.name = name;
    }
}

class Browser extends Software {
    constructor(name) {
        super();
        this.name = name;
        this.plugins = [];
    }

    installPlugin(plugin) {
        if(plugin instanceof Plugin)
        {
            this.plugins.push(plugin);
            console.log("Plugin-ul " + plugin.name + " a fost instalat in " + this.name);
        }
    }

    run() {
        console.log("Browser-ul " + this.name + " ruleaza.");
    }

    listPlugins() {
        if (this.plugins.length === 0)
        {
            console.log("Browser-ul " + this.name + " nu are plugin-uri.");
        }
        else
        {
            console.log("Plugin-urile browser-ului " + this.name + " sunt: ");
            this.plugins.forEach((plugin) => {
                console.log(plugin.name + " ");
            });
        }
    }
}

const discord = new Software("Discord");
discord.run();

const firefox = new Browser("Firefox");

const adblock = new Plugin("Adblock");
const yomitan = new Plugin("Yomitan");

firefox.installPlugin(adblock);
firefox.installPlugin(yomitan);

firefox.run();
firefox.listPlugins();