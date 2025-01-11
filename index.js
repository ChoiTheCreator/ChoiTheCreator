import { writeFileSync } from 'node:fs';
import Parser from 'rss-parser';

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `# 반갑습니다. 최원빈입니다. 👋


## Languages

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/> 
  <img src="https://img.shields.io/badge/Java-5382A1?style=flat-square&logo=openjdk&logoColor=white"/> <!-- Java 로고 변경 -->
</p>

## Frameworks & Libraries

<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=Vue.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>
</p>

## Styling Tools

<p>
  <img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"/>
  <img src="https://img.shields.io/badge/Styled Components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
</p>

## Tools

<p>
  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/>
  <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=Visual Studio Code&logoColor=white"/>
  <img src="https://img.shields.io/badge/RStudio-75AADB?style=flat-square&logo=RStudio&logoColor=white"/> <!-- R Studio 추가 -->
</p>

---

<p>아래는 최근 블로그 포스트입니다. 새로운 기술과 스스로의 개발경험 및 영화평론과 영화제작등을 공유하고 있습니다!</p>

`;

// rss-parser 생성
const parser = new Parser({
  headers: {
    Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
  },
});

(async () => {
  // 피드 목록
  const feed = await parser.parseURL('https://wonbin109.tistory.com/rss'); // 본인의 블로그 주소

  text += `<ul style="list-style-type: square; font-size: 16px;">`;

  // 최신 7개의 글의 제목과 링크를 가져온 후 text에 추가
  for (let i = 0; i < Math.min(7, feed.items.length); i++) {
    const { title, link, isoDate } = feed.items[i];
    const postDate = new Date(isoDate).toLocaleDateString(); // 포스팅 날짜 추가
    text += `
      <li style="margin-bottom: 8px;">
        <strong>📌 <a href='${link}' target='_blank' style="text-decoration: none; color: #007acc;">${title}</a></strong>
        <br />
        <span style="font-size: 14px; color: #555;">🗓️ ${postDate}</span>
      </li>
    `;
  }

  text += `</ul>`;

  text += `
  <hr/>
  <p style="font-size: 14px; color: #777;">👉 더 많은 글을 보시려면 <a href="https://wonbin109.tistory.com/" target="_blank" style="text-decoration: none; color: #007acc;"><strong>블로그</strong></a>를 방문해 주세요!</p>
  `;

  // README.md 파일 생성
  writeFileSync('README.md', text, 'utf8', (e) => {
    if (e) console.log(e);
  });

  console.log('README.md 업데이트 완료!');
})();
