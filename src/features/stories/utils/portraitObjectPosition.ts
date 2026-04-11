/**
 * `object-fit: cover` crop anchor for portrait photos. Pure `center` can clip heads in
 * short containers; pure `top` shows only the upper face. ~35% vertical targets the
 * eye region while keeping chin and shoulders in frame for typical stock portraits.
 */
export const PORTRAIT_IMAGE_OBJECT_POSITION = '50% 35%' as const
