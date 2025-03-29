import { writeFileSync } from 'node:fs';
import Parser from 'rss-parser';

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `# 안녕하세요

## 🧑🏻‍💻 Languages

<p>
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/> 
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/> 
  <img src="https://img.shields.io/badge/Java-5382A1?style=flat-square&logo=openjdk&logoColor=white"/>
</p>

## 📘 Frameworks 

<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=Vue.js&logoColor=white"/>
+ <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/>
</p>




---


## 📕 Latest Blog Posts

`;

const pinnedPosts = [
  {
    title: '📌 Project : Wallet Guardians, 최종 회고록',
    link: 'https://wonbin109.tistory.com/111',
  },
];

// rss-parser 생성
const parser = new Parser({
  headers: {
    Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
  },
});

// 고정된 글 먼저 추가
pinnedPosts.forEach(({ title, link }) => {
  text += `<a href="${link}">${title}</a></br>`;
});

(async () => {
  // 피드 목록
  const feed = await parser.parseURL('https://wonbin109.tistory.com/rss');

  // 최신 8개의 글의 제목과 링크를 가져온 후 text에 추가
  for (let i = 0; i < 7; i++) {
    const { title, link } = feed.items[i];
    console.log(`${i + 1}번째 게시물`);
    console.log(`추가될 제목: ${title}`);
    console.log(`추가될 링크: ${link}`);
    text += `<a href=${link}>${title}</a></br>`;
  }

  // README.md 파일 작성
  writeFileSync('README.md', text, 'utf8', (e) => {
    console.log(e);
  });

  console.log('업데이트 완료');
})();
