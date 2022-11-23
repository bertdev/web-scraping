import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

function removeHtmlTags(text) {
  const regex = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
  return text.replaceAll(regex, '');
}

function mapSearchResult(data) {
  const dataMapped = [];
  for (const item of data) {
    const title = item.querySelector('.gs_rt')?.innerHTML || "";
    const link = item.querySelector('h3.gs_rt a')?.getAttribute('href') || "";
    const authors = item.querySelector('.gs_a')?.innerHTML || "";
    const description = item.querySelector('div.gs_rs')?.innerHTML || "";
    dataMapped.push({
      title: removeHtmlTags(title),
      authors: removeHtmlTags(authors),
      description: removeHtmlTags(description),
      link
    }); 
  }
  return dataMapped;
}

const main = async () => {
  const response = await fetch('https://scholar.google.com.br/scholar?hl=pt-BR&as_sdt=0%2C5&q=intro+a+computer+science&btnG=');
  const responseBody = await response.text();
  const dom = new JSDOM(responseBody);
  const body = dom.window.document.querySelector('body');
  const searchResultItens = body.querySelectorAll('.gs_r');
  console.log(mapSearchResult(searchResultItens));
}
main();
