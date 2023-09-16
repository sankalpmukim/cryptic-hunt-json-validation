import { z } from "zod";

export const defaultValue = `
{
  "$schema": "https://cryptichuntjson.sankalpmukim.dev/schema.json",
  "name": "Phase 4-6",
  "description": {
    "Question": "QuestionName", 
    "Difficulty": "Easy|Medium|Hard", 
    "Authors": [
      "Author 1",
      "Author 2"
    ]
  },
  "phase": 4,
  "isQR": true,
  "qrLink": [
    "http://with.acmvit.in/phase4-6-erqweasgdterg"
  ],
  "question": {
    "title": "This is the name shown to people",
    "description": "This is the description shown to people",
    "answer": "The expected answer",
    "pointsAwarded": 100,
    "costofHint": 50,
    "hint": "ASCII 85",
    "images": [
        "https://cloudfront.net/questionImage.jpg"
    ]
  }
}
`.trim();

const mySchema = z
  .object({
    $schema: z
      .literal("https://cryptichuntjson.sankalpmukim.dev/schema.json")
      .optional(),
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: 'Name must be a string try using `"`',
      })
      .startsWith("Phase "),
    description: z.object({
      Question: z.string(),
      Difficulty: z.enum(["Easy", "Medium", "Hard"]),
      Authors: z.array(z.string()),
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
    qrLink: z.array(
      z
        .string({
          required_error: "QR Link is required",
          invalid_type_error: "QR Link must be a string",
        })
        .url({
          message: "QR Link must be a valid url",
        }),
    ),
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
        pointsAwarded: z
          .literal(100, {
            required_error: "Question points awarded is required",
            invalid_type_error: "Question points awarded must be a number",
          })
          .or(
            z.literal(200, {
              required_error: "Question points awarded is required",
              invalid_type_error: "Question points awarded must be a number",
            }),
          )
          .or(
            z.literal(350, {
              required_error: "Question points awarded is required",
              invalid_type_error: "Question points awarded must be a number",
            }),
          ),
        costofHint: z.number({
          required_error: "Question cost of hint is required",
          invalid_type_error: "Question cost of hint must be a number",
        }),
        hint: z
          .string({
            required_error: "Question hint is required",
            invalid_type_error: "Question hint must be a string",
          })
          .nullable(),
        images: z.array(
          z
            .string({
              required_error: "Question images is required",
              invalid_type_error: "Question images must be a string",
            })
            .url({
              message: "Question images must be a valid url",
            }),
        ),
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
