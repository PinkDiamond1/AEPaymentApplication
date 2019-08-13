import {Controller, Get, Param} from '@nestjs/common';
import {AppService} from "../app.service";
import {ClientService, Hub} from "./client.service";
import {ServerChannel} from "./channel";
import {Actor, CClient} from "./client.entity";


abstract class ClientController {
  constructor(  //private readonly appService: AppService,
              private readonly clientService: ClientService) {
        console.log(new Error);
      setTimeout( () => {
          console.log("1-------- this is:", this);
      }, 0);
  }

  get service(): ClientService {
      if (this.clientService!=undefined)
          return this.clientService;
      return Hub.Get().service;
  }

  abstract get kind(): Actor ;

  @Get(":address/:amount/:name")
  async connectMerchant(@Param() params): Promise<any> {
      return this.launchClient(this.kind, params.address.toString(),
                                params.name.toString(), params.amount.toString());
  }

  @Get(":address/:amount")
  async connectMerchant2(@Param() params): Promise<any> {
      let result = await this.service.queryClient(params.address, this.kind);
      if (result==undefined) {
          return {"error": "No name specified!!"};
      }
      return this.launchClient(this.kind, params.address.toString(),
                                result.name, params.amount.toString());
  }

  launchClient(kind: Actor, address, name, amount: string) {
      const client: CClient = new CClient();
      client.kind = kind;
      client.address = address;
      client.amount = amount;
      client.name = name;
      console.log("1-------- this is:", this);
      return this.service.connect(client);
  }

  @Get(":address")
  async queryClient(@Param() params): Promise<any> {
      let result = await this.service.queryClient(params.address, this.kind);
      if (result==undefined) {
          return null;
      }
      let response = ServerChannel.GetInfo();
      response["name"] = result.name;
      return response;
  }
}

@Controller('merchant')
export class MerchantController extends ClientController {
    get kind(): Actor {
        return "merchant";
    }
}


@Controller('client')
export class CustomerController extends ClientController {
    get kind(): Actor {
        return "customer";
    }
}
