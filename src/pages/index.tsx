import Head from "next/head";
import { useState,useEffect } from "react";
import Editor from "@monaco-editor/react";
import useIsMobile from "~/hooks/useIsMobile";
import useJsonChecker from "~/hooks/useJsonChecker";
import schema, { defaultValue } from "~/schema";

export default function Home() {
  const [jsonData, setJsonData] = useState(defaultValue);
  const isMobileScreen = useIsMobile();

  const [errors, isJsonValid] = useJsonChecker(jsonData, schema);
  const [marker, setMarker] = useState<string[]>([]);

  useEffect(() => {
    const textarea = document.querySelector('textarea[name="output"]');
    if (textarea instanceof HTMLTextAreaElement && errors.length == 0 && marker.length > 0) {
      textarea.value = marker.join("\n");
    }
  }, [marker]);

  return (
    <>
      <Head>
        <title>{`JSON Validation testing for cryptic hunt`}</title>
        <meta
          name="description"
          content="Use this to develop and validate your JSONs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col space-y-4 p-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="flex-1 rounded border p-4">
          <h3 className="mb-2 font-semibold">{`Input JSON Data`}</h3>
          <Editor
            height={isMobileScreen ? "50vh" : "70vh"}
            language="json"
            theme="vs-dark"
            className="w-full resize-none rounded border p-2"
            value={jsonData}
            onChange={(e) => setJsonData(e ?? "")}
            defaultValue={defaultValue}
            onMount={(editor, monaco) => {
              editor.focus();
              monaco.editor.onDidChangeMarkers(([uri]) => {
                const markers = monaco.editor.getModelMarkers({resource: uri})
                const marker = markers.map(
                  ({ message, startLineNumber, startColumn}) =>
                    `${message} (line ${startLineNumber} column ${startColumn})`,
                );
                setMarker(marker);
              });
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/ban-ts-comment
              monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
                enableSchemaRequest: true,
              });
            }}
          />
        </div>
        <div className="flex-1 rounded border p-4">
          <h3 className="mb-2 font-semibold">
            {isJsonValid ? `JSON is valid` : `Here are the errors`}
          </h3>
          <textarea
            name = "output"
            rows={10}
            className="w-full resize-none rounded border p-2"
            readOnly
            value={errors.length > 0 ? errors : `Schema is valid`}
          />
        </div>
        {/* <button
          onClick={validateJson}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 md:mt-0"
        >
          Validate
        </button> */}
      </main>
    </>
  );
}
