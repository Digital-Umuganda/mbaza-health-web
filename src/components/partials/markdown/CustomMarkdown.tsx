import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CustomMarkdown = ({ markdown = '', className = '' }) => {
  return (
    <div className={`${className} prose`}>
      <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
    </div>
  );
};

export default CustomMarkdown;
