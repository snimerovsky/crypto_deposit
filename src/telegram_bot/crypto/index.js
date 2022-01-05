const Services = require("./services");
const Scenes = require( "./scenes");

export default class Crypto {
    constructor(app) {
        this.app = app
        this.services = new Services(app)
        this.scenes = new Scenes(app)
    }

    initStages = (stages) => {
        for (let scene of this.scenes.scenes) {
            stages.register(scene)
        }
    };
}
