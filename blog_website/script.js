document.addEventListener('DOMContentLoaded', function() {
    // Code for the homepage (index.html)
    if (document.body.classList.contains('home')) {
        const latestArticles = JSON.parse(localStorage.getItem('articles')) || [];

        const latestArticlesList = document.getElementById('latest-articles-list');
        latestArticles.slice(-5).forEach(article => {  // Show the latest 5 articles
            const listItem = document.createElement('li');
            listItem.innerHTML = `<h3><a href="article.html?id=${latestArticles.indexOf(article)}">${article.title}</a></h3><p>${article.content.substring(0, 100)}...</p><small>${article.date}</small>`;
            latestArticlesList.appendChild(listItem);
        });
    }

    // Code for the articles listing page (articles.html)
    if (document.body.classList.contains('articles')) {
        const articles = JSON.parse(localStorage.getItem('articles')) || [];
        
        const articlesList = document.getElementById('articles-list');
        if (articles.length === 0) {
            articlesList.innerHTML = '<li>No articles available.</li>';
        } else {
            articles.forEach((article, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<h3><a href="article.html?id=${index}">${article.title}</a></h3><p>${article.content.substring(0, 100)}...</p><small>${article.date}</small>`;
                articlesList.appendChild(listItem);
            });
        }
    }

    // Code for the article page (article.html)
    if (document.body.classList.contains('article')) {
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');

        const articles = JSON.parse(localStorage.getItem('articles')) || [];
        const article = articles[articleId];

        if (article) {
            document.title = article.title;
            document.querySelector('header h1').textContent = article.title;

            const articleContent = document.getElementById('article-content');
            articleContent.innerHTML = `
                <h2>${article.title}</h2>
                <p>${article.content}</p>
                <small>Posted on ${article.date}</small>
            `;
        }
    }

    // Code for the contact page (contact.html)
    if (document.body.classList.contains('contact')) {
        const contactForm = document.getElementById('contact-form');
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            console.log('Form submitted:', data);

            alert('Message sent successfully!');
            contactForm.reset();
        });
    }

    // Code for the post-article page (post-article.html)
    if (document.body.classList.contains('post-article')) {
        const postArticleForm = document.getElementById('post-article-form');
        postArticleForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(postArticleForm);
            const article = {
                title: formData.get('title'),
                content: formData.get('content'),
                date: formData.get('date')
            };

            let articles = JSON.parse(localStorage.getItem('articles')) || [];
            articles.push(article);
            localStorage.setItem('articles', JSON.stringify(articles));

            alert('Article posted successfully!');
            postArticleForm.reset();
        });
    }
});
