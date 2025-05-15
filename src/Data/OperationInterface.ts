import { Param } from "../Enum/Param";
import { IParam } from "../Param/IParam";

export interface OperationInterface {
  getGateway(): string | null;

  /**
   * @throws InvalidArgumentException
   */
  addParam(param: IParam): OperationInterface;

  getParam(param: Param): IParam | null;

  /**
   * @return IParam[]
   */
  getParams(): IParam[];
}