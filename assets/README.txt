========================================================================
✨ SPARK JOY EVENT MANAGEMENT - HOW TO REPLACE WITH YOUR REAL PHOTOS
========================================================================

Welcome! Your Spark Joy Event Management website is now configured to use 100% 
local relative image paths located inside this `assets/` directory.

------------------------------------------------------------------------
📁 FOLDER STRUCTURE
------------------------------------------------------------------------

assets/
  logo/
    logo.svg                      <-- Replace with your vector or PNG logo
  gallery/
    birthday theme Goodie bags/    <-- Place photos of birthday setups & goodie bags here
    Custom Piñatas/               <-- Place photos of custom piñatas here
    Kids’ Workshops/              <-- Place photos of kids cookie/slime workshops here

------------------------------------------------------------------------
📸 HOW TO REPLACE AN IMAGE WITH YOUR PHOTO:
------------------------------------------------------------------------

1. Copy your real photo (e.g. `my-photo.jpg` or `unicorn-pinata.jpg`) 
   into the matching folder inside `assets/gallery/`.

2. Open `index.html` in your text editor.

3. Find the corresponding `<img>` tag in `index.html` and update its `src` attribute 
   to point to your new file path:

   Example:
   <img src="assets/gallery/Custom Piñatas/unicorn-pinata.jpg" alt="Spark Joy Handcrafted Unicorn Piñata in Qatar" />

4. Update the `alt="..."` attribute with a descriptive title so search engines 
   and visitors know what is pictured in your photo.

------------------------------------------------------------------------
💡 SUPPORTED IMAGE FORMATS:
------------------------------------------------------------------------
• .jpg / .jpeg
• .png
• .webp
• .svg

That's it! Save your `index.html` and refresh your browser to see your real 
Spark Joy event photos immediately!
========================================================================
