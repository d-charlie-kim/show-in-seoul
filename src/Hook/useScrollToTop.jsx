import { useCallback } from 'react';
import { useRef, useState, useEffect } from 'react';

const useScrollToTop = () => {
  const sectionLayoutRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScrollTop = () => {
    if (sectionLayoutRef.current) {
      sectionLayoutRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      setScrollPosition(0);
    }
  };

  const handleScroll = useCallback(() => {
    if (sectionLayoutRef.current) {
      setScrollPosition(sectionLayoutRef.current.scrollTop);
    }
  }, [sectionLayoutRef]);

  useEffect(() => {
    const currentRef = sectionLayoutRef.current;

    const scrollHandler = () => {
      if (currentRef) {
        setScrollPosition(currentRef.scrollTop);
      }
    };

    if (currentRef) {
      currentRef.addEventListener('scroll', scrollHandler);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', scrollHandler);
      }
    };
  }, [sectionLayoutRef]);

  return {
    sectionLayoutRef,
    scrollPosition,
    handleScrollTop,
    handleScroll,
  };
};

export default useScrollToTop;
