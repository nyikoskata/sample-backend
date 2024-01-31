import express, {Express, Request, Response, NextFunction} from "express";
import IController from "./interfaces/controller.interface";

export default class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: IController[], port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 loggerMiddleware(request: Request, response: Response, next: NextFunction) {
    console.log(`${request.method} ${request.path}`);
    next();
  }
  
  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(this.loggerMiddleware);
  }

  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
