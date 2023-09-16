import schema from "../src/schema";
import { zodToJsonSchema } from "zod-to-json-schema";

const jsonSchema = zodToJsonSchema(schema, "mySchema");
console.log(JSON.stringify(jsonSchema));
