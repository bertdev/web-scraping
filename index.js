import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

const main = async () => {
  const response = await fetch('https://scholar.google.com.br/scholar?hl=pt-BR&as_sdt=0%2C5&q=intro+a+computer+science&btnG=');
  const body = await response.text();

  const dom = new JSDOM(body)
  dom.window.document.querySelectorAll('.gs_rt a').forEach(item => console.log({
    title: item.textContent,
    link: item.getAttribute('href')
  }))
}

main();