import React, { useState, useEffect } from 'react';
import {
  DiscordIcon,
  ReadmeIcon,
  TelegramIcon,
  TwitterIcon,
} from '../assets/icons';
import { Modal } from '../components/Modal';
import Whitelist from './Whitelist';
import Mint from './Mint';
import AnimatedImages from '../components/Image';

export default function Home() {
  const [openWhiteListModal, setOpenWhiteListModal] = useState(false);
  const [openMintListModal, setOpenMintListModal] = useState(false);

  const faqs = [
    {
      title: 'What are Teznutz?',
      text: 'TezNutz is the first NFT collection on Tezos that will be usable as an in-game asset. Build your very unique story while collecting, playing the game, make real money with the native token by winning wager matches, buying and selling NFTs and winning tournaments.',
    },
    {
      title: 'How can I join Teznutz?',
      text: 'Simply join our discord to become a Teznutz member.',
    },
    {
      title: 'How can I join the Whitelist?',
      text: 'Just hit the whitelist button on our website and you are in!',
    },
    {
      title: 'What is the mint price?',
      text: 'Whitelist mint price is x XTZ. Public mint price is x XTZ',
    },
    {
      title: 'How much Teznutz are available to mint?',
      text: 'XXXXXX',
    },
    {
      title: 'Will the distribution be fair?',
      text: "Yes absolutely. Each mint is randomized and controlled by our contract. There is no possibility for manipulation. The contract contains a provenance hash – this allows anyone to verify that we didn't assign Teznutz after minting them.",
    },
    {
      title: 'Minting limit',
      text: 'There is no minting limit. Feel free to mint a whole TezNutz Army!',
    },
    {
      title: 'When can I mint and what happens after I minted Teznutz?',
      text: "In the beginning minting is only allowed for whitelist user. Public Minting starts afterwards and is open till all Teznutz are minted. After you mint your Teznutz the NFT's will be visible in your Wallet and in your objkt.com collection.",
    },
    {
      title: "Where can I trade my NFT's and Token?",
      text: 'Teznutz have their own collection on objkt.com and can be traded there. Our native token will be listed on a DEX (tba) There will be also more Exchange Listings in the future',
    },
    {
      title: 'Is there a rarity System?',
      text: 'Yes of course. You can see the stats on our collection on objkt.com.',
    },
    {
      title: 'Do you guys have a roadmap?',
      text: "It would be nutz to don't have one - so here is ours",
    },
    {
      title: 'Did I get that right? – It is a game?',
      text: 'Yes you got that right! For further informations about our game please read the Whitepaper',
    },
    {
      title: 'Can I earn through playing?',
      text: "Would be nutz if you couldn't right? We care about your nutz and reward them. For more details read our Whitepaper or join our socials",
    },
  ];

  const handleCloseModal = () => {
    setOpenWhiteListModal(false);
    setOpenMintListModal(false);
  };

  return (
    <>
      {/* Header */}
      <div className={`header-cmp`}>
        <div className='wrapper wrapWidth'>
          <div className='left'>
            <a href='/' className='hdr-logo'>
              <img
                className='img'
                src={require('../assets/images/logo.png')}
                alt=''
              />
            </a>
          </div>
          <div className='right'>
            <button
              className='link whiteList'
              onClick={() => setOpenWhiteListModal(true)}
            >
              Whitelist
            </button>
            <button className='link' onClick={() => setOpenMintListModal(true)}>
              Mint
            </button>
          </div>
        </div>
      </div>
      <div className='home-page' data-scroll-section>
        {/* Step 1 section */}
        <div className='work-step-section hero-section'>
          <div className='wrapper wrapWidth'>
            <div className='left-side'>
              <div className='slogn' data-scroll data-scroll-speed='2'>
                Unique Game Character Nfts
              </div>
              <div className='text' data-scroll data-scroll-speed='2'>
                TezNutz will be the first 100% blockchain based play to earn
                game on the Tezos blockchain.
              </div>
            </div>
            <div className='right-side'>
              <img
                src={require('../assets/images/assembled/2.png')}
                className='vector'
              />
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className='how-it-works'>
          <div className='wrapper wrapWidth'>
            <div className='title' data-scroll data-scroll-speed='2'>
              How it works
            </div>
          </div>
        </div>

        {/* Step 1 section */}
        <div className='work-step-section'>
          <div className='wrapper wrapWidth'>
            <div className='left-side'>
              <div className='slogn' data-scroll data-scroll-speed='2'>
                01.
              </div>
              <div className='slogn' data-scroll data-scroll-speed='2'>
                MINT YOUR UNIQUE BASE GAME NFT CHARACTER
              </div>
              <div className='text' data-scroll data-scroll-speed='2'>
                Mint and own your individual base game nft character you will be
                able to battle others and earn play to earn rewards with.
              </div>
            </div>
            <div className='right-side'>
              <AnimatedImages
                dirPath={'plain'}
                imagesLength={3}
                extension={'png'}
              />
            </div>
          </div>
          <div
            className='bg-transparent-text'
            data-scroll
            data-scroll-speed='8'
            data-scroll-direction='horizontal'
          >
            BASE NFTS
          </div>
        </div>

        {/* Step 2 section */}
        <div className='work-step-section vector-left-side'>
          <div className='wrapper wrapWidth'>
            <div className='right-side'>
              <AnimatedImages
                dirPath={'armorCollection'}
                imagesLength={3}
                extension={'png'}
              />
            </div>
            <div className='left-side'>
              <div className='slogn' data-scroll data-scroll-speed='2'>
                02.
              </div>
              <div className='slogn' data-scroll data-scroll-speed='2'>
                MINT AND EQUIP YOUR PERSONAL ARMOR
              </div>
              <div className='text' data-scroll data-scroll-speed='2'>
                Every TezNut will be able to equip one helmet and one armor at a
                given point in time. The pieces will boost your characters
                defensive skills and may lead to increased pay to earn rewards.
              </div>
            </div>
          </div>
          <div
            className='bg-transparent-text'
            data-scroll
            data-scroll-speed='-8'
            data-scroll-direction='horizontal'
          >
            Armory
          </div>
        </div>

        {/* Step 3 section */}
        <div className='work-step-section'>
          <div className='wrapper wrapWidth'>
            <div className='left-side'>
              <div className='slogn' data-scroll data-scroll-speed='2'>
                03.
              </div>
              <div className='slogn' data-scroll data-scroll-speed='2'>
                CRAFT AND USE UNIQUE WEAPONS AND SHIELDS
              </div>
              <div className='text' data-scroll data-scroll-speed='2'>
                To stand a chance against the game characters of other players,
                you can craft shields and weapons. These can be equipped on your
                game character and will not only help him during fights against
                other TezNutz but may increase its overall play to earn reward
                gains.
              </div>
            </div>
            <div className='right-side'>
              <AnimatedImages
                dirPath={'weaponCollection'}
                imagesLength={3}
                extension={'png'}
              />
            </div>
          </div>
          <div
            className='bg-transparent-text'
            data-scroll
            data-scroll-speed='8'
            data-scroll-direction='horizontal'
          >
            Weapons
          </div>
        </div>

        {/* Step 4 section */}
        <div className='work-step-section vector-left-side'>
          <div className='wrapper wrapWidth'>
            <div className='right-side'>
              <AnimatedImages
                dirPath={'assembled'}
                imagesLength={3}
                extension={'png'}
              />
            </div>
            <div className='left-side'>
              <div className='slogn' data-scroll data-scroll-speed='2'>
                04.
              </div>
              <div className='slogn' data-scroll data-scroll-speed='2'>
                CRAFT AND USE UNIQUE WEAPONS AND SHIELDS
              </div>
              <div className='text' data-scroll data-scroll-speed='2'>
                To stand a chance against the game characters of other players,
                you can craft shields and weapons. These can be equipped on your
                game character and will not only help him during fights against
                other TezNutz but may increase its overall play to earn reward
                gains.
              </div>
            </div>
          </div>
          <div
            className='bg-transparent-text play-to-earn'
            data-scroll
            data-scroll-speed='-8'
            data-scroll-direction='horizontal'
          >
            Play to Earn
          </div>
        </div>

        {/* Step 5 section */}
        <div className='work-step-section'>
          <div className='wrapper wrapWidth'>
            <div className='left-side'>
              <div className='slogn' data-scroll data-scroll-speed='2'>
                05.
              </div>
              <div className='slogn' data-scroll data-scroll-speed='2'>
                RARITY LEVEL
              </div>
              <div className='text' data-scroll data-scroll-speed='2'>
                There are six rarity level representing by the rotating
                background circle. Common Uncommon Rare Epic Legendary and
                Mythic!
              </div>
            </div>
            <div className='right-side'>
              <AnimatedImages
                dirPath={'rarity'}
                imagesLength={5}
                extension={'gif'}
              />
            </div>
          </div>
        </div>

        {/* Step 6 section */}
        <div className='work-step-section vector-left-side'>
          <div className='wrapper wrapWidth'>
            <div className='right-side'>
              <AnimatedImages
                dirPath={'body'}
                imagesLength={14}
                extension={'png'}
              />
            </div>
            <div className='left-side'>
              <div className='slogn' data-scroll data-scroll-speed='2'>
                06.
              </div>
              <div className='slogn' data-scroll data-scroll-speed='2'>
                BODY-TYPES
              </div>
              <div className='text' data-scroll data-scroll-speed='2'>
                We provide 14 different body types
              </div>
            </div>
          </div>
        </div>

        {/* Step 7 section */}
        <div className='work-step-section'>
          <div className='wrapper wrapWidth'>
            <div className='left-side'>
              <div className='slogn' data-scroll data-scroll-speed='2'>
                07.
              </div>
              <div className='slogn' data-scroll data-scroll-speed='2'>
                BEARD-TYPES
              </div>
              <div className='text' data-scroll data-scroll-speed='2'>
                We have a lot of different beard types for every taste. You
                don&quot;t need to go to the barber shop!
              </div>
            </div>
            <div className='right-side'>
              <AnimatedImages
                dirPath={'beard'}
                imagesLength={10}
                extension={'png'}
              />
            </div>
          </div>
        </div>

        {/* Step 8 section */}
        <div className='work-step-section vector-left-side'>
          <div className='wrapper wrapWidth'>
            <div className='right-side'>
              <AnimatedImages
                dirPath={'armorSelection'}
                imagesLength={8}
                extension={'png'}
              />
            </div>
            <div className='left-side'>
              <div className='slogn' data-scroll data-scroll-speed='2'>
                08.
              </div>
              <div className='slogn' data-scroll data-scroll-speed='2'>
                ARMOR
              </div>
              <div className='text' data-scroll data-scroll-speed='2'>
                And yes we provide everything to make your TezNut prepared to
                fight!
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Ask a question */}
        <div className='faq-section'>
          <div className='wrapper wrapWidth'>
            <div className='title' data-scroll data-scroll-speed='2'>
              Frequently Asked Questions - FAQ
            </div>
            <div className='list'>
              {faqs.map((item, index) => (
                <div key={index} className='block'>
                  <div className='label' data-scroll data-scroll-speed='2'>
                    {item.title}
                  </div>
                  <div className='text' data-scroll data-scroll-speed='2'>
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Join us */}
        <div className='join-section'>
          <div className='wrapper wrapWidth'>
            <div className='title' data-scroll data-scroll-speed='2'>
              Join us
            </div>
            <div className='social-links'>
              <a
                rel='noreferrer'
                href='https://www.google.de'
                target='_blank'
                className='social-link'
                data-scroll
                data-scroll-speed='2'
              >
                <DiscordIcon />
              </a>
              <a
                rel='noreferrer'
                href='https://www.google.de'
                target='_blank'
                className='social-link'
                data-scroll
                data-scroll-speed='2'
              >
                <TelegramIcon />
              </a>
              <a
                rel='noreferrer'
                href='https://twitter.com/teznutz'
                target='_blank'
                className='social-link'
                data-scroll
                data-scroll-speed='2'
              >
                <TwitterIcon />
              </a>
              <a
                rel='noreferrer'
                href='https://teznutz.xyz/assets/pdf/whitepaper.pdf'
                target='_blank'
                className='social-link'
                data-scroll
                data-scroll-speed='2'
              >
                <ReadmeIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Whitelist Modal */}
      <Modal open={openWhiteListModal} onClose={handleCloseModal}>
        <Whitelist handleCloseModal={handleCloseModal} />
      </Modal>
      {/* Mint Modal */}
      <Modal open={openMintListModal} onClose={handleCloseModal}>
        <Mint handleCloseModal={handleCloseModal} />
      </Modal>
    </>
  );
}
