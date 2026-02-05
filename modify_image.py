from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


def main() -> None:
    path = Path("evidencias/6.png")
    image = Image.open(path).convert("RGB")
    data = np.array(image, dtype=np.float32)
    height, width, _ = data.shape

    # Build a per-row background reference using columns without white text.
    reference_slice = data[:, 260:460]
    valid_mask = (reference_slice < 230).all(axis=2)
    row_colors = []
    last_color = np.array([90.0, 130.0, 160.0], dtype=np.float32)
    for y in range(height):
        row = reference_slice[y][valid_mask[y]]
        if len(row) == 0:
            row_colors.append(last_color)
        else:
            median = np.median(row, axis=0)
            last_color = median
            row_colors.append(median)
    row_colors = np.stack(row_colors)

    # Estimated bounds of the rounded photo.
    photo_left, photo_right = 634, 946
    photo_top, photo_bottom = 186, 558

    # Replace the warm glow left of the photo with the background reference color.
    x_start = max(photo_left - 150, 0)
    x_end = min(photo_left + 15, width)
    for x in range(x_start, x_end):
        column = data[:, x]
        warm_pixels = (column[:, 0] > column[:, 2] + 5) & (column[:, 0] > 70)
        if not np.any(warm_pixels):
            continue
        data[warm_pixels, x, :] = row_colors[np.where(warm_pixels)[0]]

    # Create a drop-shadow mask offset from the photo.
    shadow_mask = Image.new("L", (width, height), 0)
    draw = ImageDraw.Draw(shadow_mask)
    offset_x, offset_y = 18, 20
    shadow_box = (
        photo_left + offset_x,
        photo_top + offset_y,
        photo_right + offset_x,
        photo_bottom + offset_y,
    )
    draw.rounded_rectangle(shadow_box, radius=40, fill=220)
    shadow_mask = shadow_mask.filter(ImageFilter.GaussianBlur(18))

    # Remove the photo interior so only the surrounding background darkens.
    draw = ImageDraw.Draw(shadow_mask)
    draw.rounded_rectangle(
        (photo_left - 2, photo_top - 2, photo_right + 2, photo_bottom + 2),
        radius=38,
        fill=0,
    )
    mask_array = np.array(shadow_mask, dtype=np.float32) / 255.0

    # Darken the background using the shadow mask to mimic a drop shadow.
    strength = 0.55
    data *= 1.0 - mask_array[..., None] * strength
    np.clip(data, 0, 255, out=data)

    result = Image.fromarray(data.astype(np.uint8), mode="RGB")
    result.save(path)


if __name__ == "__main__":
    main()

