'use client';

import { useEffect } from 'react';

const BackRedirect = () => {
  useEffect(() => {
    // ALTERE O LINK PARA A PÁGINA QUE QUISER MOSTRAR QUANDO O USUÁRIO TENTAR SAIR
    const link = 'https://receitai.vercel.app/';

    const setBackRedirect = (url: string) => {
      let urlBackRedirect = url;
      urlBackRedirect =
        urlBackRedirect.trim() +
        (urlBackRedirect.indexOf('?') > 0 ? '&' : '?') +
        document.location.search.replace('?', '').toString();

      history.pushState({}, '', location.href);
      history.pushState({}, '', location.href);
      history.pushState({}, '', location.href);

      const handlePopState = () => {
        console.log('onpopstate', urlBackRedirect);
        setTimeout(() => {
          location.href = urlBackRedirect;
        }, 1);
      };

      window.addEventListener('popstate', handlePopState);

      // Cleanup function to remove the event listener when the component unmounts
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    };

    const cleanup = setBackRedirect(link);

    return cleanup;
  }, []); // Empty dependency array ensures this runs only once on mount

  return null; // This component does not render anything visible
};

export default BackRedirect;
