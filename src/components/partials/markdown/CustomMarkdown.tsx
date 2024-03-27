import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CustomMarkdown = ({ markdown = '', className = '' }) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      className={`${className} prose`}
    >
      {markdown.replace(/ ⁇/g, "'")}
    </Markdown>
  );
};

export default CustomMarkdown;
