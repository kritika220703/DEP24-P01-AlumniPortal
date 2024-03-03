import React, { useState } from 'react';
import "./NewAndUpdates.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faEnvelope } from '@fortawesome/free-solid-svg-icons';


const NewsCard = ({ image, heading, description }) => {
  return (
    <div className="news-card">
      <img src={image} alt={heading} />
      <div className='news-card-text'>
        <h2>{heading}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

const NewsletterCard = ({ image, heading}) => {
  return (
    <div className="newsletter-card">
      <img src={image} alt={heading} />
      <div className='newsletter-card-text'>
        <h2>{heading}</h2>
      </div>
    </div>
  );
};

const newsItems = [
  {
    id: 1,
    image: "/News_images/news1.jpg",
    heading: "News Heading 1",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste inventore est beatae, maxime autem nostrum accusamus illum amet, natus esse aliquid eveniet, voluptate tenetur ratione animi temporibus fuga dolore libero earum ullam praesentium similique? Eaque provident, enim magnam nemo corporis laboriosam quibusdam quis vel quia, ab veniam a sit. Consectetur?"
  },
  {
    id: 2,
    image: "/News_images/news2.jpg",
    heading: "News Heading 2",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste inventore est beatae, maxime autem nostrum accusamus illum amet, natus esse aliquid eveniet, voluptate tenetur ratione animi temporibus fuga dolore libero earum ullam praesentium similique? Eaque provident, enim magnam nemo corporis laboriosam quibusdam quis vel quia, ab veniam a sit. Consectetur?"
  },
  {
    id: 3,
    image: "/News_images/news3.webp",
    heading: "News Heading 3",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste inventore est beatae, maxime autem nostrum accusamus illum amet, natus esse aliquid eveniet, voluptate tenetur ratione animi temporibus fuga dolore libero earum ullam praesentium similique? Eaque provident, enim magnam nemo corporis laboriosam quibusdam quis vel quia, ab veniam a sit. Consectetur?"
  },
  {
    id: 4,
    image: "/News_images/news4.jpg",
    heading: "News Heading 4",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste inventore est beatae, maxime autem nostrum accusamus illum amet, natus esse aliquid eveniet, voluptate tenetur ratione animi temporibus fuga dolore libero earum ullam praesentium similique? Eaque provident, enim magnam nemo corporis laboriosam quibusdam quis vel quia, ab veniam a sit. Consectetur?"
  },
  {
    id: 5,
    image: "/News_images/news4.jpg",
    heading: "News Heading 4",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste inventore est beatae, maxime autem nostrum accusamus illum amet, natus esse aliquid eveniet, voluptate tenetur ratione animi temporibus fuga dolore libero earum ullam praesentium similique? Eaque provident, enim magnam nemo corporis laboriosam quibusdam quis vel quia, ab veniam a sit. Consectetur?"
  },
  {
    id: 6,
    image: "/News_images/news4.jpg",
    heading: "News Heading 4",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste inventore est beatae, maxime autem nostrum accusamus illum amet, natus esse aliquid eveniet, voluptate tenetur ratione animi temporibus fuga dolore libero earum ullam praesentium similique? Eaque provident, enim magnam nemo corporis laboriosam quibusdam quis vel quia, ab veniam a sit. Consectetur?"
  },
];

const newsletterItems = [
  {
    id: 1,
    image: "/images/images.jpg",
    heading: "Newsletter Heading 1"
  },
  {
    id: 2,
    image: "/images/car1.jpg",
    heading: "Newsletter Heading 2"
  },
  {
    id: 3,
    image: "/images/car1.jpg",
    heading: "Newsletter Heading 2"
  },
  {
    id: 4,
    image: "/images/car1.jpg",
    heading: "Newsletter Heading 2"
  },
  {
    id: 5,
    image: "/images/car1.jpg",
    heading: "Newsletter Heading 2"
  },
];

const NewAndUpdates = () => {

  const [currentDeck, setCurrentDeck] = useState(0);
  const cardsPerPage = 4;
  const totalDecks = Math.ceil(newsItems.length / cardsPerPage);

  const handleNextDeck = () => {
    setCurrentDeck((prevDeck) => Math.min(prevDeck + 1, totalDecks - 1));
  };

  const handlePrevDeck = () => {
    setCurrentDeck((prevDeck) => Math.max(prevDeck - 1, 0));
  };

  const startIdx = currentDeck * cardsPerPage;
  const endIdx = Math.min(startIdx + cardsPerPage, newsItems.length);
  const currentNews = newsItems.slice(startIdx, endIdx);

  const [currentDeck2, setCurrentDeck2] = useState(0);
  const cardsPerPage2 = 3;
  const totalDecks2 = Math.ceil(newsletterItems.length / cardsPerPage2);

  const handleNextDeck2 = () => {
    setCurrentDeck2((prevDeck2) => Math.min(prevDeck2 + 1, totalDecks2 - 1));
  };

  const handlePrevDeck2 = () => {
    setCurrentDeck2((prevDeck2) => Math.max(prevDeck2 - 1, 0));
  };

  const startIdx2 = currentDeck2 * cardsPerPage2;
  const endIdx2 = Math.min(startIdx2 + cardsPerPage2, newsletterItems.length);
  const currentNewsletter = newsletterItems.slice(startIdx2, endIdx2);
  
  return (
    <div>
      <div>
        <div className='news-updates-heading'>
          <h1><FontAwesomeIcon icon={faNewspaper} /> News and Updates</h1>
        </div>
        <div className="news-cards">
          {currentNews.map((news) => (
            <NewsCard
              key={news.id}
              image={news.image}
              heading={news.heading}
              description={news.description}
            />
          ))}
        </div>
        <div className="news-cards-navigation-bar">
          <button onClick={handlePrevDeck} disabled={currentDeck === 0}>
            Prev
          </button>
          <span>{`${currentDeck + 1} / ${totalDecks}`}</span>
          <button onClick={handleNextDeck} disabled={currentDeck === totalDecks - 1}>
            Next
          </button>
        </div>
      </div>
      <div>
        <div className='news-letters-heading'>
          <h1><FontAwesomeIcon icon={faEnvelope} /> News Letters </h1>
        </div>
        <div className="newsletter-cards">
          {currentNewsletter.map((newsletter) => (
            <NewsletterCard
              key={newsletter.id}
              image={newsletter.image}
              heading={newsletter.heading}
            />
          ))}
        </div>
        <div className="newsletter-cards-navigation-bar">
          <button onClick={handlePrevDeck2} disabled={currentDeck2 === 0}>
            Prev
          </button>
          <span>{`${currentDeck2 + 1} / ${totalDecks2}`}</span>
          <button onClick={handleNextDeck2} disabled={currentDeck2 === totalDecks2 - 1}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewAndUpdates;
