import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Message({ role, text }) {

  const isUser = role === "user";

  // FORMAT RESPONSE
  const formattedText = text

    // Remove excessive spacing
    .replace(/\n{4,}/g, "\n\n")

    // Convert bullet symbol to markdown bullets
    .replace(/•/g, "-")

    // Auto-fix repeated numbering
    .replace(
      /^1\.\s/gm,
      (() => {

        let count = 0;

        return () => `${++count}. `;
      })()
    )

    .trim();

  return (

    <div className={`w-full flex ${isUser ? "justify-end" : "justify-center"} mb-8 px-4`}>

      {/* USER MESSAGE */}
      {isUser ? (

        <div className="max-w-[80%] bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-[28px] text-[15px] leading-7 shadow-lg shadow-blue-500/20 whitespace-pre-wrap break-words">

          {text}

        </div>

      ) : (

        /* AI RESPONSE */
        <div className="w-full max-w-[900px] rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] backdrop-blur-2xl shadow-2xl shadow-black/30 overflow-hidden">

          {/* TOP ACCENT */}
          <div className="h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500" />

          {/* CONTENT */}
          <div className="px-7 py-6 overflow-x-auto">

            <div className="text-gray-200 text-[16px] leading-8 break-words">

              <ReactMarkdown

                remarkPlugins={[remarkGfm]}

                components={{

                  // PARAGRAPH
                  p: ({ children }) => (
                    <p className="text-gray-200 leading-8 mb-4 text-[16px]">
                      {children}
                    </p>
                  ),

                  // H1
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-white mt-8 mb-5">
                      {children}
                    </h1>
                  ),

                  // H2
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-semibold text-cyan-300 mt-8 mb-4">
                      {children}
                    </h2>
                  ),

                  // H3
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-blue-300 mt-6 mb-3">
                      {children}
                    </h3>
                  ),

                  // ORDERED LIST
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-6 mt-4 mb-6 space-y-3 marker:text-cyan-300 marker:font-semibold">
                      {children}
                    </ol>
                  ),

                  // UNORDERED LIST
                  ul: ({ children }) => (
                    <ul className="list-disc pl-6 mt-3 mb-5 space-y-2 marker:text-cyan-300">
                      {children}
                    </ul>
                  ),

                  // LIST ITEM
                  li: ({ children }) => (
                    <li className="text-gray-200 leading-8 text-[16px]">
                      {children}
                    </li>
                  ),

                  // STRONG TEXT
                  strong: ({ children }) => (
                    <strong className="text-white font-semibold">
                      {children}
                    </strong>
                  ),

                  // HORIZONTAL RULE
                  hr: () => (
                    <div className="my-7 border-t border-white/10" />
                  ),

                  // BLOCKQUOTE
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 my-5">
                      {children}
                    </blockquote>
                  ),

                  // INLINE CODE
                  code: ({ children }) => (
                    <code className="bg-black/30 text-green-300 px-1.5 py-0.5 rounded-md text-sm">
                      {children}
                    </code>
                  ),

                  // CODE BLOCK
                  pre: ({ children }) => (
                    <pre className="bg-black/40 border border-white/10 rounded-2xl p-4 overflow-x-auto my-6">
                      {children}
                    </pre>
                  ),

                  // TABLE
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-7 rounded-2xl border border-white/10">
                      <table className="w-full border-collapse">
                        {children}
                      </table>
                    </div>
                  ),

                  // TABLE HEAD
                  thead: ({ children }) => (
                    <thead className="bg-white/[0.05]">
                      {children}
                    </thead>
                  ),

                  // TABLE ROW
                  tr: ({ children }) => (
                    <tr className="border-t border-white/10">
                      {children}
                    </tr>
                  ),

                  // TABLE HEADER
                  th: ({ children }) => (
                    <th className="px-5 py-4 text-left text-white font-semibold">
                      {children}
                    </th>
                  ),

                  // TABLE CELL
                  td: ({ children }) => (
                    <td className="px-5 py-4 text-gray-200">
                      {children}
                    </td>
                  ),
                }}
              >

                {formattedText}

              </ReactMarkdown>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Message;