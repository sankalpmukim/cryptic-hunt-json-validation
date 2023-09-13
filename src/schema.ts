import { z } from "zod";

const mySchema = z
  .object({
    $schema: z
      .literal("https://cryptichuntjson.sankalpmukim.dev/schema.json")
      .optional(),
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: 'Name must be a string try using `"`',
    }),
    description: z.string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    }),
    phase: z
      .number({
        required_error: "Phase is required",
        invalid_type_error: "Phase must be a number between 1 and 10",
      })
      .min(1)
      .max(10),
    isQR: z.boolean({
      required_error: "isQR is required",
      invalid_type_error: "isQR must be a boolean. try `true` or `false`",
    }),
    question: z.object(
      {
        title: z.string({
          required_error: "Question title is required",
          invalid_type_error: "Question title must be a string",
        }),
        description: z.string({
          required_error: "Question description is required",
          invalid_type_error: "Question description must be a string",
        }),
        answer: z.string({
          required_error: "Question answer is required",
          invalid_type_error: "Question answer must be a string",
        }),
        pointsAwarded: z.number({
          required_error: "Question points awarded is required",
          invalid_type_error: "Question points awarded must be a number",
        }),
        costofHint: z.number({
          required_error: "Question cost of hint is required",
          invalid_type_error: "Question cost of hint must be a number",
        }),
        hint: z.string({
          required_error: "Question hint is required",
          invalid_type_error: "Question hint must be a string",
        }),
      },
      {
        required_error: "Question is required",
        invalid_type_error: "Question must be an object",
      },
    ),
  })
  .describe("My neat question schema")
  .strict();

export default mySchema;
