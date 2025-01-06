CREATE OR REPLACE FUNCTION handle_product_sale(
  p_product_id UUID,
  p_sale_quantity INTEGER,
  p_user_id UUID
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_current_quantity INTEGER;
  v_remaining_quantity INTEGER;
  v_product RECORD;
BEGIN
  -- Get the current product information
  SELECT * INTO v_product
  FROM products
  WHERE id = p_product_id AND user_id = p_user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Product not found';
  END IF;

  v_current_quantity := v_product.quantity;
  
  IF v_current_quantity < p_sale_quantity THEN
    RAISE EXCEPTION 'Insufficient quantity available';
  END IF;

  v_remaining_quantity := v_current_quantity - p_sale_quantity;

  IF v_remaining_quantity > 0 THEN
    -- Create a new product record for the remaining quantity
    INSERT INTO products (
      user_id,
      name,
      category_id,
      purchase_price,
      target_price,
      quantity,
      condition,
      notes,
      store_id,
      purchase_date,
      location,
      status
    )
    VALUES (
      v_product.user_id,
      v_product.name,
      v_product.category_id,
      v_product.purchase_price,
      v_product.target_price,
      v_remaining_quantity,
      v_product.condition,
      v_product.notes,
      v_product.store_id,
      v_product.purchase_date,
      v_product.location,
      'in_stock'
    );

    -- Update the original product with the sold quantity and status
    UPDATE products
    SET 
      quantity = p_sale_quantity,
      status = 'pending_shipment',
      updated_at = NOW()
    WHERE id = p_product_id;
  ELSE
    -- If all quantity is sold, just update the status
    UPDATE products
    SET 
      status = 'pending_shipment',
      updated_at = NOW()
    WHERE id = p_product_id;
  END IF;
END;
$$;