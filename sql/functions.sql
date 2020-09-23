CREATE OR REPLACE FUNCTION public.offer_images(offer_row offers)
 RETURNS SETOF images
 LANGUAGE sql
 STABLE
AS $function$
  SELECT *
  FROM images
  WHERE
    ( 
      images.imageable_type = 'Offer' AND
      images.imageable_id = offer_row.id
    )
$function$;

CREATE OR REPLACE FUNCTION public.item_images(item_row items)
 RETURNS SETOF images
 LANGUAGE sql
 STABLE
AS $function$
  SELECT *
  FROM images
  WHERE
    ( 
      images.imageable_type = 'Item' AND
      images.imageable_id = item_row.id
    )
$function$;

CREATE OR REPLACE FUNCTION public.item_images(package_row packages)
 RETURNS SETOF images
 LANGUAGE sql
 STABLE
AS $function$
  SELECT *
  FROM images
  WHERE
    ( 
      images.imageable_type = 'Package' AND
      images.imageable_id = package_row.id
    )
$function$;
