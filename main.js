"use strict";

document.addEventListener('DOMContentLoaded', async (e) => {
    // redirect to new website
    window.location.replace("https://yuvv.xyz");
    
    const myUsername = "yuvraajsj18";
    const latestArticles = await getLatestArticles(myUsername);
    showLatestArticles(latestArticles);
});

function showLatestArticles(latestArticles) {
    latestArticles.forEach(article => {
        const articleLink = document.createElement('a');
        articleLink.className = "blog-link";
        articleLink.setAttribute('href', article.link);
        articleLink.setAttribute('target', '_blank');
        articleLink.setAttribute('rel', 'noopener noreferrer');
        articleLink.append(document.createTextNode(article.title));

        document.querySelector('#latest-articles').append(articleLink);
    });
}

async function getLatestArticles(username) {
    const latestArticlesQuery = `
                        {
                            user(username:"${username}") {
                                publicationDomain
                                publication {
                                    posts(page: 0) {
                                        slug
                                        title
                                    }
                                }
                            }
                        }
                    `

    const res = await fetch('https://api.hashnode.com/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: latestArticlesQuery,
        }),
    });

    const userData = await res.json();
    const blogDomain = userData.data.user.publicationDomain;
    const posts = userData.data.user.publication.posts;

    const latestArticles = [];
    posts.forEach(post => {
        const article = {
            link: `https://${blogDomain}/${post.slug}`,
            title: post.title,
        };

        latestArticles.push(article);
    });

    return latestArticles;
}
