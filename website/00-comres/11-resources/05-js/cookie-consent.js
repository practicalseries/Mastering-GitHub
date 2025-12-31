/* MASTERING GITHUB (c) 2025

*******************************************************************************
Title:              MASTERING GITHUB                          COOKIE-CONSENT.JS
*******************************************************************************

MASTERING GITHUB:   Is authored by Michael Gledhill 
                    and published by the Practical Series of Publications
                    Published in the United Kingdom

                    Email: mg@masteringgithub.com
                    Web:   https://masteringgithub.com

-------------------------------------------------------------------------------
DETAILS

This style sheet provides the JS logic for a modal cookie consent banner (and 
footer link).

This banner is necessary for GDPR compliance and will disable Google analytics
cookies (the only cookies on the website
-------------------------------------------------------------------------------


*******************************************************************************
MODIFICATION HISTORY:

This is a complete summary of all software modifications.

Date           Issue       Author         Reason for Modification
-------------------------------------------------------------------------------
31 Dec 2025    001.000      M. Gledhill   File created
---------------------------------------------------------------------------- */


/* =========================================================
   Cookie consent modal logic (GA4 Consent Mode)
   ========================================================= */

(function () {
  const backdrop = document.getElementById('cookie-modal-backdrop');
  const modal    = document.getElementById('cookie-modal');
  const accept   = document.getElementById('cookie-accept');
  const decline  = document.getElementById('cookie-decline');
  const closeBtn = document.getElementById('cookie-close');
  const settingsLink = document.getElementById('cookie-settings');

  if (!backdrop || !modal) return;

  function openModal() {
    backdrop.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    (accept || modal).focus?.();
  }

  function closeModal() {
    backdrop.hidden = true;
    document.documentElement.style.overflow = '';
  }

  /* First visit */
  if (!localStorage.getItem('cookie_consent')) {
    openModal();
  }

  accept.addEventListener('click', () => {
    localStorage.setItem('cookie_consent', 'accepted');
    if (typeof gtag === 'function') {
      gtag('consent', 'update', { analytics_storage: 'granted' });
    }
    closeModal();
  });

  decline.addEventListener('click', () => {
    localStorage.setItem('cookie_consent', 'declined');
    if (typeof gtag === 'function') {
      gtag('consent', 'update', { analytics_storage: 'denied' });
    }
    closeModal();
  });

  closeBtn.addEventListener('click', closeModal);

  /* Click outside modal */
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  /* ESC key */
  document.addEventListener('keydown', (e) => {
    if (!backdrop.hidden && e.key === 'Escape') {
      closeModal();
    }
  });

  /* Footer link: reopen preferences */
  if (settingsLink) {
    settingsLink.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }
})();
