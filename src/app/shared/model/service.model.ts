export class ServiceModel {
  Id: number | undefined = undefined;
  Name: string = "";
  Price: number = 0;
  Description: string = "";
}

ServiceModel.prototype.toString = () => 'jabuka'
