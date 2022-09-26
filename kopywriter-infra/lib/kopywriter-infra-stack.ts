import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as dotenv from "dotenv";

dotenv.config();

export class KopywriterInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const layer = new lambda.LayerVersion(this, "Baselayer", {
      code: lambda.Code.fromAsset("baselayer/layer.zip"),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_9],
    });

    const apiLambda = new lambda.Function(this, "ApiFunction", {
      runtime: lambda.Runtime.PYTHON_3_9,
      code: lambda.Code.fromAsset("../app/"),
      handler: "kopywriter_api.handler",
      layers: [layer],
      environment: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "",
      },
    });

    const kopywriterapi = new apigateway.RestApi(this, "RestAPI", {
      restApiName: "Kopywriter API",
    });

    kopywriterapi.root.addProxy({
      defaultIntegration: new apigateway.LambdaIntegration(apiLambda),
    });
  }
}
