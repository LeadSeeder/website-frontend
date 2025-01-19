// Sample blog posts data
const blogPosts = [
    {
        id: 1,
        title: "10 Proven Strategies to Generate B2B Leads in 2025",
        excerpt: "Discover the most effective strategies that successful B2B companies are using to generate quality leads in today's digital landscape. From AI-powered automation to personalized outreach...",
        category: "Marketing",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hcmtldGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        date: "January 20, 2025",
        readTime: "5 min read",
        author: "Sarah Johnson",
        slug: "10-proven-strategies-b2b-leads-2025"
    },
    {
        id: 2,
        title: "The Ultimate Guide to Sales Automation in LinkedIn",
        excerpt: "Learn how to leverage automation tools to streamline your LinkedIn sales process and increase conversion rates while maintaining authentic relationships with your prospects...",
        category: "Sales",
        image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2FsZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        date: "January 19, 2025",
        readTime: "7 min read",
        author: "Michael Chen",
        slug: "ultimate-guide-sales-automation-linkedin"
    },
    {
        id: 3,
        title: "How AI is Revolutionizing B2B Lead Generation",
        excerpt: "Artificial Intelligence is transforming how businesses approach lead generation. Discover the latest AI tools and techniques that are helping companies identify and qualify leads...",
        category: "Automation",
        image: "https://images.unsplash.com/photo-1488229297570-58520851e868?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXV0b21hdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        date: "January 18, 2025",
        readTime: "6 min read",
        author: "David Wilson",
        slug: "ai-revolutionizing-b2b-lead-generation"
    },
    {
        id: 4,
        title: "5 LinkedIn Outreach Templates That Actually Work",
        excerpt: "Stop using generic templates that get ignored. Here are 5 proven LinkedIn outreach templates that will help you connect with decision-makers and start meaningful conversations...",
        category: "Tips",
        image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGlua2VkaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        date: "January 17, 2025",
        readTime: "4 min read",
        author: "Emily Parker",
        slug: "5-linkedin-outreach-templates"
    },
    {
        id: 5,
        title: "Building a Strong B2B Sales Pipeline in 2025",
        excerpt: "A comprehensive guide to building and maintaining a healthy sales pipeline in today's competitive B2B landscape. Learn how to qualify leads, track opportunities...",
        category: "Sales",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhbGVzJTIwcGlwZWxpbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        date: "January 16, 2025",
        readTime: "8 min read",
        author: "Robert Martinez",
        slug: "building-strong-b2b-sales-pipeline-2025"
    },
    {
        id: 6,
        title: "The Power of Personalization in B2B Marketing",
        excerpt: "Discover how personalization can transform your B2B marketing efforts. From customized content to targeted campaigns, learn how to create meaningful connections...",
        category: "Marketing",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbmFsaXphdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        date: "January 15, 2025",
        readTime: "6 min read",
        author: "Lisa Thompson",
        slug: "power-personalization-b2b-marketing"
    }
];

// DOM Elements
const postsGrid = document.querySelector('.posts-grid');
const featuredGrid = document.querySelector('.featured-grid');
const categoryTags = document.querySelectorAll('.category-tag');
const searchInput = document.getElementById('blog-search');
const loadMoreButton = document.getElementById('load-more-posts');
const newsletterForm = document.getElementById('newsletter-form');

// Current state
let currentCategory = 'all';
let currentPage = 1;
const postsPerPage = 6;

// Filter posts by category and search term
function filterPosts(posts, category, searchTerm) {
    return posts.filter(post => {
        const matchesCategory = category === 'all' || post.category.toLowerCase() === category.toLowerCase();
        const matchesSearch = !searchTerm || 
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });
}

// Create post HTML
function createPostHTML(post, isFeatured = false) {
    return `
        <article class="featured-post">
            <a href="posts/${post.slug}.html" class="post-link">
                <div class="post-image">
                    <img src="${post.image}" alt="${post.title}">
                </div>
                <div class="post-content">
                    <span class="category">${post.category}</span>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <div class="post-meta">
                        <span class="author">By ${post.author}</span>
                        <span class="date">${post.date}</span>
                        <span class="read-time">${post.readTime}</span>
                    </div>
                </div>
            </a>
        </article>
    `;
}

// Render posts
function renderPosts() {
    const searchTerm = searchInput.value;
    const filteredPosts = filterPosts(blogPosts, currentCategory, searchTerm);
    
    // Display featured posts (first 2 posts)
    if (featuredGrid) {
        const featuredPosts = filteredPosts.slice(0, 2);
        featuredGrid.innerHTML = featuredPosts.map(post => createPostHTML(post, true)).join('');
    }

    // Display regular posts (excluding featured ones)
    const regularPosts = filteredPosts.slice(2, 2 + currentPage * postsPerPage);
    postsGrid.innerHTML = regularPosts.map(post => createPostHTML(post)).join('');
    
    // Show/hide load more button
    loadMoreButton.style.display = 
        regularPosts.length < (filteredPosts.length - 2) ? 'block' : 'none';
}

// Event Listeners
categoryTags.forEach(tag => {
    tag.addEventListener('click', () => {
        // Update active category
        categoryTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        
        // Update current category and reset page
        currentCategory = tag.dataset.category;
        currentPage = 1;
        renderPosts();
    });
});

searchInput.addEventListener('input', () => {
    currentPage = 1;
    renderPosts();
});

loadMoreButton.addEventListener('click', () => {
    currentPage++;
    renderPosts();
});

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert('Thank you for subscribing! We\'ll keep you updated with our latest content.');
        newsletterForm.reset();
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
});
