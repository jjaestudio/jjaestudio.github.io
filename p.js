// Import MBTI_Nodon_Descriptions
import './MBTI_Nodon_Descriptions.js';
import { MBTI_Nodon_Descriptions } from './MBTI_Nodon_Descriptions.js';

function copyToClipboard() {
  navigator.clipboard.writeText(window.location.href);
  alert('Link copied to clipboard!');
}
window.copyToClipboard = copyToClipboard;

function shareToDiscord() {
  const text = `Check out my Nodon result: ${getNodon()} Nodon!`;
  const url = window.location.href;
  // Combine text and URL without encoding
  const shareText = `${text} ${url}`;
  navigator.clipboard.writeText(shareText);
  alert('Share text copied! Paste it in Discord.');

}
window.shareToDiscord = shareToDiscord;

function shareToTwitter() {
  const text = encodeURIComponent(`I got ${getNodon()} Nodon! Check out your Nodon result:`);
  const url = encodeURIComponent(window.location.href);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}
window.shareToTwitter = shareToTwitter;

// Function to get query parameter by name
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function getNodon() {
  const nodonInfo = getNodonInfo();
  if (nodonInfo == null) { return ""; }
  return nodonInfo["Nodon"];
}

function getImageUrl(nodonName) {
  return `assets/nodon-images/${nodonName.toLowerCase()}.png`;
}

function getNodonInfo() {
  const index = getQueryParam('p');
  console.log('Index from URL:', index);

  if (index == null) {
    console.log('index is null');
    const container = document.getElementsByClassName('gbg-container')[0];

    container.innerHTML = '<p>Error: No Nodon index provided.</p>';
    console.log(container.innerHTML);
    return;
  }

  return MBTI_Nodon_Descriptions[index];
}

function populateContent() {
  const nodonInfo = getNodonInfo();
  console.log('Nodon Info:', nodonInfo);

  document.getElementsByClassName('character-title')[0].textContent = nodonInfo["Nodon"];
  document.getElementsByClassName('tagline')[0].textContent = nodonInfo["Blurb1"];
  document.getElementsByClassName('description-content')[0].innerHTML = '<p>' + nodonInfo["Description"] + '</p>';
  document.getElementsByClassName('best-friend')[0].getElementsByClassName('relationship-name')[0].textContent = nodonInfo["FriendlyNodon"];
  document.getElementsByClassName('rival')[0].getElementsByClassName('relationship-name')[0].textContent = nodonInfo["ArchNodon"];

  const imageElement = document.getElementsByClassName('character-image')[0]
    ;
  if (imageElement) {
    imageElement.src = getImageUrl(nodonInfo["Nodon"]);
    imageElement.alt = nodonInfo["Nodon"];
  } else {
    console.error('Error: Element with class "character-image" not found.');
  }

  const bestFriendImage = document.getElementById("best-friend-img");
  bestFriendImage.src = getImageUrl(nodonInfo["FriendlyNodon"]);
  bestFriendImage.alt = nodonInfo["FriendlyNodon"];

  const archNodonImage = document.getElementById("rival-img");
  archNodonImage.src = getImageUrl(nodonInfo["ArchNodon"]);
  archNodonImage.alt = nodonInfo["ArchNodon"];
}


document.addEventListener('DOMContentLoaded', () => {
  populateContent();
});
