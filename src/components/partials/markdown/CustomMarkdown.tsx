import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CustomMarkdown = ({ markdown = '', className = '' }) => {
  return (
    <div className={`${className} prose`}>
      <Markdown remarkPlugins={[remarkGfm]}>
        {markdown.replace(/ ⁇/g, "'")}
      </Markdown>
    </div>
  );
};

export default CustomMarkdown;
