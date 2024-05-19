$(document).ready(() => {
  // Function to animate the scrolling of images to the right
  const animateRowNext = (row) => {
    const $lastImage = row.children("img").last();
    const $imageMargin = parseInt($lastImage.css("margin-right"));
    const $lastImageWidth = $lastImage.outerWidth(true);
    const $lastImageClone = $lastImage.clone();

    // Prepending a clone of the last image to the beginning of the row
    $lastImageClone
      .prependTo(row)
      .css({ marginLeft: $imageMargin, opacity: 1 });

    // Animating the disappearance of the original last image
    $lastImage.animate({ marginRight: `-=${$lastImageWidth}px` }, 1000);

    // Removing the original last image from the row after animation
    setTimeout(() => {
      $lastImage.remove();
    }, 1000);
  };

  // Function to animate the previous row of images
  const animateRowPrev = (row) => {
    const $firstImage = row.children("img").first();
    const $imageMargin = parseInt($firstImage.css("margin-left"));
    const $firstImageWidth = $firstImage.outerWidth(true);
    const $firstImageClone = $firstImage.clone();

    // Appending a clone of the first image to the end of the row
    $firstImageClone
      .appendTo(row)
      .css({ marginLeft: -$firstImageWidth + $imageMargin, opacity: 0 });

    // Animating the appearance of the first image at the end of the row
    $firstImageClone.animate({ marginLeft: $imageMargin, opacity: 0 }, 500);
    $firstImageClone.animate({ marginLeft: $imageMargin, opacity: 1 }, 500);

    // Removing the original first image from the row after animation
    setTimeout(() => {
      $firstImage.remove();
    }, 1000);
  };

  // Handling click events for next and previous buttons
  $(".next, .prev").on("click", function () {
    // Disabling buttons while animation is ongoing to prevent multiple clicks
    $(".next, .prev").prop("disabled", true);

    // Now "event.target" refers to the clicked button
    const $button = $(this);
    const $upperRow = $(".upper-row");
    const $lowerRow = $(".lower-row");

    // Determining which direction to animate based on the clicked button
    if ($button.hasClass("next")) {
      animateRowNext($upperRow);
      animateRowNext($lowerRow);
    } else if ($button.hasClass("prev")) {
      animateRowPrev($upperRow);
      animateRowPrev($lowerRow);
    }

    // Enabling buttons after animation is complete
    setTimeout(() => {
      $(".next, .prev").prop("disabled", false);
    }, 1000);
  });
});
