import { useRef,useEffect } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

function FaqListItem({ question, answer,isOpen,onClick }){
 
    const contentRef = useRef(null);

    useEffect(() => {
      const content = contentRef.current;
      if (content) {
        if (isOpen) {
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.style.maxHeight = '0px';
        }
      }
    }, [isOpen]);


  return (
    <div className="overflow-hidden">
      <div className="w-full hover:opacity-90 rounded-lg transition-colors flex">
        <button
          onClick={onClick}
          className="flex py-5 justify-between border-b border-gray-100 dark:border-gray-700 px-4 items-center w-full text-left"
          style={{ justifyContent: 'flex-start' }}
        >
          <span className="font-semibold text-lg lg:text-xl text-gray-800 dark:text-white mr-10">{question}</span>
          <span className="ml-auto flex items-center">
            {isOpen ? (
              <ChevronDownIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronRightIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </span>
        </button>
      </div>
      <div
        style={{ maxHeight: '0px' }}
        ref={contentRef}
        className="overflow-hidden rounded-lg transition-all duration-300 ease-in-out"
      >
        <div className="px-5 py-5 bg-gray-50 dark:bg-gray-700">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default FaqListItem;