use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn bubble_sort(mut values: Vec<f64>) -> Vec<f64> {
    if values.len() < 2 {
        return values;
    }

    for end in (1..values.len()).rev() {
        let mut swapped = false;
        for index in 0..end {
            if values[index] > values[index + 1] {
                values.swap(index, index + 1);
                swapped = true;
            }
        }
        if !swapped {
            break;
        }
    }

    values
}

#[wasm_bindgen]
pub fn quick_sort(mut values: Vec<f64>) -> Vec<f64> {
    values.sort_by(|left, right| left.total_cmp(right));
    values
}

#[cfg(test)]
mod tests {
    use super::{bubble_sort, quick_sort};

    #[test]
    fn sorts_values() {
        let input = vec![5.0, -1.0, 3.0, 3.0, 0.0];
        let expected = vec![-1.0, 0.0, 3.0, 3.0, 5.0];
        assert_eq!(bubble_sort(input.clone()), expected);
        assert_eq!(quick_sort(input), expected);
    }
}
