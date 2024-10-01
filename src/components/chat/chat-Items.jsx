import React from 'react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message) {
    if (message.includes("```")) {
      const blocks = message.split("```");
      return blocks;
    }
  }
  
  function isCodeBlock(str) {
    if (
      str.includes("=") ||
      str.includes(";") ||
      str.includes("[") ||
      str.includes("]") ||
      str.includes("{") ||
      str.includes("}") ||
      str.includes("#") ||
      str.includes("//")
    ) {
      return true;
    }
    return false;
  }

const ChatItems = ({ content, role }) => {

    const messageBlocks = extractCodeFromString(content);

  return (
    <div>
      {role === 'assistant' ? (
        // Assistant's message
        <div className="flex items-center bg-gray-800 text-white p-3 rounded-lg my-2 font-bold font-sans text-lg">
          <img
            src="openai.png" // Change the image source if necessary
            alt="Assistant"
            className="h-8 w-8 rounded-full mr-4"
          />
          <div>
            {!messageBlocks && (
                <div style={{ fontSize: "20px" }}>{content}</div>
                )}
                {messageBlocks &&
                messageBlocks.length &&
                messageBlocks.map((block,idx) =>
                    isCodeBlock(block) ? (
                    <SyntaxHighlighter style={coldarkDark} language="javascript"key={`assistant-block-${idx}`}>
                        {block}
                    </SyntaxHighlighter>
                    ) : (
                    <div key={`user-text-${idx}`} style={{ fontSize: "20px" }}>{block}</div>
                    )
                )}

          </div>
        </div>
      ) : (
        // User's message
        <div className="flex items-center bg-white text-gray-700 p-3 rounded-lg my-2 justify-end font-bold font-sans text-lg">
          <div>
          {!messageBlocks && (
                <div style={{ fontSize: "20px" }}>{content}</div>
                )}
                {messageBlocks &&
                messageBlocks.length &&
                messageBlocks.map((block,idx) =>
                    isCodeBlock(block) ? (
                    <SyntaxHighlighter style={coldarkDark} language="javascript"key={`user-text-${idx}`}>
                        {block}
                    </SyntaxHighlighter>
                    ) : (
                    <div key={`user-text-${idx}`} style={{ fontSize: "20px" }}>{block}</div>
                    )
                )}
          </div>
          <img
            src="user.png" // Change the image source if necessary
            alt="User"
            className="h-8 w-8 rounded-full ml-4"
          />
        </div>
      )}
    </div> 
  );
};

export default ChatItems;
