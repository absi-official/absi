// articles.js with pagination and embedded CSS

// Function to inject CSS styles into the DOM
function injectPaginationStyles() {
  // Check if styles are already injected
  if (document.getElementById('articles-js-styles')) {
    return;
  }
  
  const styles = `
    /* Pagination Styles */
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 2rem;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .pagination-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 40px;
      height: 40px;
      padding: 0 12px;
      background-color: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      color: #4a5568;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .pagination-btn:hover:not(:disabled) {
      background-color: #f7fafc;
      border-color: #cbd5e0;
      color: #2d3748;
    }
    
    .pagination-btn.active {
      background-color:#5f8ea8;
      border-color: #5f8ea8;
      color: white;
    }
    
    .pagination-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .prev-btn, .next-btn {
      padding: 0 16px;
      font-size: 14px;
    }
    
    .page-numbers {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    
    .pagination-ellipsis {
      padding: 0 8px;
      color: #a0aec0;
      font-size: 14px;
    }
    
    .page-info {
      margin-left: 1rem;
      color: #718096;
      font-size: 14px;
    }
    
    /* Responsive adjustments for pagination */
    @media (max-width: 768px) {
      .pagination {
        gap: 0.25rem;
      }
      
      .pagination-btn {
        min-width: 36px;
        height: 36px;
        font-size: 12px;
        padding: 0 8px;
      }
      
      .prev-btn, .next-btn {
        padding: 0 12px;
        font-size: 12px;
      }
      
      .page-info {
        width: 100%;
        text-align: center;
        margin-left: 0;
        margin-top: 0.5rem;
      }
    }
  `;
  
  const styleElement = document.createElement('style');
  styleElement.id = 'articles-js-styles';
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

// Sample article data - in a real application, this would come from an API or database
const articlesData = {
  latest: [
    {
      id: "AB2506001",
      tag: "Research Article · Open Access",
      title: "Comparative Perceptions of Korean Fine Dining: A Big Data Analysis of Michelin-Starred Restaurants in and outside the USA",
      authors: "Ja Yeon Cho, Angellie Williady, Hak-Seon Kim",
      abstract: "In today's digital era, millions of diners share their experiences online, creating vast datasets that reveal how consumers perceive global cuisines. This study utilizes big data analytics to compare perceptions of Korean fine dining restaurants in the USA versus those in other countries, providing insights into cultural differences in food appreciation.",
      pdfUrl: "./assets/Document/AB2506001.pdf"
    },
    {
      id: "AB2506002",
      tag: "Research Article · Open Access",
      title: "Big Data Exploration of India's Heritage Tourism: Understanding Visitor Experiences",
      authors: "Sadaf Akhtar, Angellie Williady, Narariya Dita Handani",
      abstract: "India's rich cultural heritage and remarkable architectural landmarks establish it as one of the leading destinations for heritage tourism, showcasing iconic sites such as the City Palace, Amber Fort in Jaipur, and Gwalior Fort. This study employs big data analytics to explore visitor experiences, sentiments, and preferences at these heritage sites.",
      pdfUrl: "./assets/Document/AB2506002.pdf"
    },
    {
      id: "AB2506003",
      tag: "Research Article · Open Access",
      title: "Visual Factors Influencing Booking Intention on Online Travel Agent Platforms",
      authors: "Natasya Maurren Tan, Angellie Williady, Aura Lydia Riswanto, Agus Riyadi",
      abstract: "This study examines the influence of visual design elements on user attitudes and booking intentions within online travel agent (OTA) websites. Grounded in the Stimulus–Organism Response (S-O-R) framework, it investigates how color (red and green text) and imagery (human-centric versus scenery-centric) as visual stimuli shape users' attitudes (organism) and subsequent behavioral intentions (response).",
      pdfUrl: "./assets/Document/AB2506003.pdf"
    },
    {
      id: "AB2506004",
      tag: "Research Article · Open Access",
      title: "Effects of Visual Design Elements on Consumer Attention and Purchase Intention in Café App",
      authors: "Seieun Kim, Hak-Seon Kim, Timothy J. Lee",
      abstract: "With the number of coffee shops in South Korea now exceeding 100,000 and mobile ordering continuing to expand, café applications have become vital platforms for engaging consumers. This study investigates how specific visual design elements in café apps influence consumer attention and purchase intention.",
      pdfUrl: "./assets/Document/AB2506004.pdf"
    },
    {
      id: "AB2506005",
      tag: "Research Article · Open Access",
      title: "Optimism and Proactive Habits: Predicting Academic Resilience and Achievement",
      authors: "Sulav Shrivastav, Aura Lydia Riswanto, Hak-Seon Kim, Jue Wang, Armigon Akhmedov",
      abstract: "This study investigates the relationship between optimism, proactive habits, and academic resilience and achievement among university students. Grounded in the positive psychology framework, it conceptualizes resilience as a mediating mechanism linking personal dispositions to academic performance outcomes.",
      pdfUrl: "./assets/Document/AB2506005.pdf"
    },
     {
      id: "AB2506006",
      tag: "Review Article",
      title: "The Social Psychology of Adopting AI-Based Health Sensors: Insights from a Qualitative Study",
      authors: "Dat Hung Ho, Hak-Seon Kim, Yaeji Kim",
      abstract: "This qualitative study explores the social psychological factors influencing the adoption of AI-based health sensors among different demographic groups.",
      pdfUrl: "./assets/Document/AB2506006.pdf"
    },
    {
      id: "AB2506007",
      tag: "Review Article",
      title: "AI-Based Recommendation System, FOMO, and Online Impulse Buying Behavior: An S-O-R Perspective",
      authors: "Nga Thi Hong Nguyen, Xiaobin Zhang",
      abstract: "This research examines how AI-based recommendation systems trigger Fear Of Missing Out (FOMO) and subsequently influence online impulse buying behavior through the Stimulus-Organism-Response (S-O-R) framework.",
      pdfUrl: "./assets/Document/AB2506007.pdf"
    },
    {
      id: "AB2506008",
      tag: "Review Article",
      title: "Modeling and Forecasting Monthly Domestic Tourism Expenditure through the SARIMAX Approach",
      authors: "Si-Yu Zhang, Jue Wang",
      abstract: "This study applies the Seasonal Autoregressive Integrated Moving Average with Exogenous Variables (SARIMAX) model to forecast monthly domestic tourism expenditure.",
      pdfUrl: "./assets/Document/AB2506008.pdf"
    },
    {
      id: "AB2506009",
      tag: "Review Article",
      title: "Evaluating the Impact of High-Tech Features on Customer Satisfaction: Insight from Global Online Review",
      authors: "Ummi Aliyah, Neila Aisha, Hyun-Jeong Ban",
      abstract: "This research analyzes global online reviews to evaluate how high-tech features in hospitality services impact customer satisfaction.",
      pdfUrl: "./assets/Document/AB2506009.pdf"
    },
    {
      id: "AB2506010",
      tag: "Review Article",
      title: "Vegetarian and Vegan Food Provision in Busan: Availability, Nutrition, and Satisfaction among International Students",
      authors: "Ankita Limbachia, Shuting Tao",
      abstract: "This study examines the availability, nutritional value, and satisfaction levels of vegetarian and vegan food options for international students in Busan, South Korea.",
      pdfUrl: "./assets/Document/AB2506010.pdf"
    }
  ],
  upcoming: [
    // Add upcoming articles here
  ],
  "all-issues": [
    {
      id: "AB2506001",
      tag: "Review Article",
      title: "Comparative Perceptions of Korean Fine Dining: A Big Data Analysis of Michelin-Starred Restaurants in and outside the USA.",
      authors: "Ja Yeon Cho, Angellie Williady, Hak-Seon Kim",
      abstract: "In today's digital era, millions of diners share their experiences online, creating vast datasets that reveal how consumers perceive global cuisines. This study utilizes big data analytics to compare perceptions of Korean fine dining restaurants in the USA versus those in other countries.",
      pdfUrl: "./assets/Document/AB2506001.pdf"
    },
    {
      id: "AB2506002",
      tag: "Review Article",
      title: "Big Data Exploration of India's Heritage Tourism: Understanding Visitor Experiences",
      authors: "Sadaf Akhtar, Angellie Williady, Narariya Dita Handani",
      abstract: "India's rich cultural heritage and remarkable architectural landmarks establish it as one of the leading destinations for heritage tourism, showcasing iconic sites such as the City Palace, Amber Fort in Jaipur, and Gwalior Fort.",
      pdfUrl: "./assets/Document/AB2506002.pdf"
    },
    {
      id: "AB2506003",
      tag: "Review Article",
      title: "Visual Factors Influencing Booking Intention on Online Travel Agent Platforms",
      authors: "Natasya Maurren Tan, Angellie Williady, Aura Lydia Riswanto, Agus Riyadi",
      abstract: "This study examines the influence of visual design elements on user attitudes and booking intentions within online travel agent (OTA) websites.",
      pdfUrl: "./assets/Document/AB2506003.pdf"
    },
    {
      id: "AB2506004",
      tag: "Review Article",
      title: "Effects of Visual Design Elements on Consumer Attention and Purchase Intention in Café App",
      authors: "Seieun Kim, Hak-Seon Kim, Timothy J. Lee",
      abstract: "With the number of coffee shops in South Korea now exceeding 100,000 and mobile ordering continuing to expand, café applications have become vital platforms for engaging consumers.",
      pdfUrl: "./assets/Document/AB2506004.pdf"
    },
    {
      id: "AB2506005",
      tag: "Review Article",
      title: "Optimism and Proactive Habits: Predicting Academic Resilience and Achievement",
      authors: "Sulav Shrivastav, Aura Lydia Riswanto, Hak-Seon Kim, Jue Wang, Armigon Akhmedov",
      abstract: "This study investigates the relationship between optimism, proactive habits, and academic resilience and achievement among university students.",
      pdfUrl: "./assets/Document/AB2506005.pdf"
    },
      {
      id: "AB2506006",
      tag: "Review Article",
      title: "The Social Psychology of Adopting AI-Based Health Sensors: Insights from a Qualitative Study",
      authors: "Dat Hung Ho, Hak-Seon Kim, Yaeji Kim",
      abstract: "This qualitative study explores the social psychological factors influencing the adoption of AI-based health sensors among different demographic groups.",
      pdfUrl: "./assets/Document/AB2506006.pdf"
    },
    {
      id: "AB2506007",
      tag: "Review Article",
      title: "AI-Based Recommendation System, FOMO, and Online Impulse Buying Behavior: An S-O-R Perspective",
      authors: "Nga Thi Hong Nguyen, Xiaobin Zhang",
      abstract: "This research examines how AI-based recommendation systems trigger Fear Of Missing Out (FOMO) and subsequently influence online impulse buying behavior through the Stimulus-Organism-Response (S-O-R) framework.",
      pdfUrl: "./assets/Document/AB2506007.pdf"
    },
    {
      id: "AB2506008",
      tag: "Review Article",
      title: "Modeling and Forecasting Monthly Domestic Tourism Expenditure through the SARIMAX Approach",
      authors: "Si-Yu Zhang, Jue Wang",
      abstract: "This study applies the Seasonal Autoregressive Integrated Moving Average with Exogenous Variables (SARIMAX) model to forecast monthly domestic tourism expenditure.",
      pdfUrl: "./assets/Document/AB2506008.pdf"
    },
    {
      id: "AB2506009",
      tag: "Review Article",
      title: "Evaluating the Impact of High-Tech Features on Customer Satisfaction: Insight from Global Online Review",
      authors: "Ummi Aliyah, Neila Aisha, Hyun-Jeong Ban",
      abstract: "This research analyzes global online reviews to evaluate how high-tech features in hospitality services impact customer satisfaction.",
      pdfUrl: "./assets/Document/AB2506009.pdf"
    },
    {
      id: "AB2506010",
      tag: "Review Article",
      title: "Vegetarian and Vegan Food Provision in Busan: Availability, Nutrition, and Satisfaction among International Students",
      authors: "Ankita Limbachia, Shuting Tao",
      abstract: "This study examines the availability, nutritional value, and satisfaction levels of vegetarian and vegan food options for international students in Busan, South Korea.",
      pdfUrl: "./assets/Document/AB2506010.pdf"
    }
  ]
};

// Pagination configuration
const paginationConfig = {
  articlesPerPage: 5, // Number of articles to show per page
  maxVisiblePages: 5  // Maximum number of page buttons to show
};

// Current state for pagination
let currentPageState = {
  'latest': 1,
  'upcoming': 1,
  'all-issues': 1
};

// Function to create an article card element
function createArticleCard(article) {
  const articleCard = document.createElement('article');
  articleCard.className = 'article-card';
  
  // Create tag element
  const tagElement = document.createElement('div');
  tagElement.className = 'tag';
  tagElement.textContent = article.tag;
  
  // Create title element
  const titleElement = document.createElement('h4');
  titleElement.textContent = article.title;
  
  // Create authors element (if exists)
  let authorsElement = null;
  if (article.authors) {
    authorsElement = document.createElement('p');
    authorsElement.className = 'authors';
    authorsElement.textContent = article.authors;
  }
  
  // Create abstract element (if exists)
  let abstractElement = null;
  if (article.abstract) {
    abstractElement = document.createElement('p');
    abstractElement.className = 'abstract';
    abstractElement.textContent = article.abstract;
  }
  
  // Create PDF link element
  const pdfLinkElement = document.createElement('a');
  pdfLinkElement.className = 'pdf';
  pdfLinkElement.href = article.pdfUrl;
  pdfLinkElement.textContent = 'View PDF';
  
  // Append all elements to the article card
  articleCard.appendChild(tagElement);
  articleCard.appendChild(titleElement);
  
  if (authorsElement) {
    articleCard.appendChild(authorsElement);
  }
  
  if (abstractElement) {
    articleCard.appendChild(abstractElement);
  }
  
  articleCard.appendChild(pdfLinkElement);
  
  return articleCard;
}

// Function to create pagination controls
function createPaginationControls(category, totalPages, currentPage) {
  const paginationContainer = document.createElement('div');
  paginationContainer.className = 'pagination';
  
  // Previous button
  const prevButton = document.createElement('button');
  prevButton.className = 'pagination-btn prev-btn';
  prevButton.innerHTML = '<i class="fas fa-chevron-left"></i> Previous';
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPageState[category] = currentPage - 1;
      renderArticles(category);
    }
  });
  paginationContainer.appendChild(prevButton);
  
  // Page numbers
  const pageNumbersContainer = document.createElement('div');
  pageNumbersContainer.className = 'page-numbers';
  
  // Calculate which page numbers to show
  let startPage = Math.max(1, currentPage - Math.floor(paginationConfig.maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + paginationConfig.maxVisiblePages - 1);
  
  // Adjust start page if we're near the end
  if (endPage - startPage < paginationConfig.maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - paginationConfig.maxVisiblePages + 1);
  }
  
  // First page and ellipsis
  if (startPage > 1) {
    const firstPageBtn = createPageButton(1, category);
    pageNumbersContainer.appendChild(firstPageBtn);
    
    if (startPage > 2) {
      const ellipsis = document.createElement('span');
      ellipsis.className = 'pagination-ellipsis';
      ellipsis.textContent = '...';
      pageNumbersContainer.appendChild(ellipsis);
    }
  }
  
  // Page numbers in the visible range
  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = createPageButton(i, category);
    if (i === currentPage) {
      pageBtn.classList.add('active');
    }
    pageNumbersContainer.appendChild(pageBtn);
  }
  
  // Last page and ellipsis
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const ellipsis = document.createElement('span');
      ellipsis.className = 'pagination-ellipsis';
      ellipsis.textContent = '...';
      pageNumbersContainer.appendChild(ellipsis);
    }
    
    const lastPageBtn = createPageButton(totalPages, category);
    pageNumbersContainer.appendChild(lastPageBtn);
  }
  
  paginationContainer.appendChild(pageNumbersContainer);
  
  // Next button
  const nextButton = document.createElement('button');
  nextButton.className = 'pagination-btn next-btn';
  nextButton.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPageState[category] = currentPage + 1;
      renderArticles(category);
    }
  });
  paginationContainer.appendChild(nextButton);
  
  // Page info
  const pageInfo = document.createElement('div');
  pageInfo.className = 'page-info';
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  paginationContainer.appendChild(pageInfo);
  
  return paginationContainer;
}

// Function to create a page button
function createPageButton(pageNum, category) {
  const pageBtn = document.createElement('button');
  pageBtn.className = 'pagination-btn page-btn';
  pageBtn.textContent = pageNum;
  pageBtn.addEventListener('click', () => {
    currentPageState[category] = pageNum;
    renderArticles(category);
  });
  return pageBtn;
}

// Function to render articles in a specific container with pagination
function renderArticles(category) {
  const container = document.getElementById(category);
  if (!container) return;
  
  // Clear existing content
  container.innerHTML = '';
  
  // Get articles for the specified category
  const articles = articlesData[category] || [];
  
  // Handle case when there are no articles
  if (articles.length === 0) {
    const noArticlesMessage = document.createElement('p');
    noArticlesMessage.className = 'muted';
    
    if (category === 'upcoming') {
      noArticlesMessage.textContent = 'Upcoming accepted articles will appear here.';
    } else {
      noArticlesMessage.textContent = 'No articles available in this category.';
    }
    
    container.appendChild(noArticlesMessage);
    return;
  }
  
  // Calculate pagination
  const currentPage = currentPageState[category] || 1;
  const articlesPerPage = paginationConfig.articlesPerPage;
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  
  // Get articles for current page
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const articlesToShow = articles.slice(startIndex, endIndex);
  
  // Create and append article cards
  articlesToShow.forEach(article => {
    const articleCard = createArticleCard(article);
    container.appendChild(articleCard);
  });
  
  // Add pagination controls if needed
  if (totalPages > 1) {
    const paginationControls = createPaginationControls(category, totalPages, currentPage);
    container.appendChild(paginationControls);
  }
}

// Function to initialize the article system
function initializeArticles() {
  // Inject CSS styles
  injectPaginationStyles();
  
  // Render articles for all categories
  renderArticles('latest');
  renderArticles('upcoming');
  renderArticles('all-issues');
  
  // Set up tab switching functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.add('hidden'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Show the corresponding content
      const targetId = button.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.remove('hidden');
      }
    });
  });
}

// Function to add a new article to a category
function addArticle(category, article) {
  if (!articlesData[category]) {
    articlesData[category] = [];
  }
  
  articlesData[category].push(article);
  // Reset to first page when adding new article
  currentPageState[category] = 1;
  renderArticles(category);
}

// Function to update an existing article
function updateArticle(category, articleId, updatedArticle) {
  if (!articlesData[category]) return;
  
  const index = articlesData[category].findIndex(article => article.id === articleId);
  if (index !== -1) {
    articlesData[category][index] = { ...articlesData[category][index], ...updatedArticle };
    renderArticles(category);
  }
}

// Function to remove an article
function removeArticle(category, articleId) {
  if (!articlesData[category]) return;
  
  articlesData[category] = articlesData[category].filter(article => article.id !== articleId);
  
  // Adjust current page if necessary
  const totalPages = Math.ceil(articlesData[category].length / paginationConfig.articlesPerPage);
  if (currentPageState[category] > totalPages && totalPages > 0) {
    currentPageState[category] = totalPages;
  }
  
  renderArticles(category);
}

// Initialize the article system when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeArticles);

// Export functions for external use if needed
window.ArticleManager = {
  addArticle,
  updateArticle,
  removeArticle,
  renderArticles
};