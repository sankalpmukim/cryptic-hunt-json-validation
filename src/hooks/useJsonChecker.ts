import { useState, useEffect } from "react";
import { z, ZodError } from "zod";

/**
 * useJsonChecker hook
 *
 * @param {string} jsonString - JSON string to be checked.
 * @param {z.ZodSchema} schema - Zod schema to be checked against.
 *
 * @returns {[string, boolean]} - A tuple with an error message and a validity boolean.
 */
const useJsonChecker = (
  jsonString: string,
  schema: z.ZodSchema,
): [string, boolean] => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    try {
      // First, try to parse the JSON
      const parsedJson: unknown = JSON.parse(jsonString);

      // Then validate against the provided schema
      schema.parse(parsedJson);

      // If everything went well, set valid state
      setIsValid(true);
      setErrorMessage("");
    } catch (error) {
      setIsValid(false);

      if (error instanceof SyntaxError) {
        // It's a JSON parsing error
        setErrorMessage(error.message);
      } else if (error instanceof ZodError) {
        // It's a Zod schema validation error
        setErrorMessage(error.errors.map((e) => e.message).join(", "));
      } else {
        // Some other unexpected error
        setErrorMessage("An unexpected error occurred.");
      }
    }
  }, [jsonString, schema]);

  return [errorMessage, isValid];
};

export default useJsonChecker;
