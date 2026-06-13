#[tauri::command]
fn platform_name() -> &'static str {
    #[cfg(target_os = "ios")]
    {
        return "ios";
    }
    #[cfg(target_os = "android")]
    {
        return "android";
    }
    "desktop-preview"
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![platform_name])
        .run(tauri::generate_context!())
        .expect("error while running AlgoMotion mobile");
}

#[cfg(test)]
mod tests {
    use super::platform_name;

    #[test]
    fn exposes_a_platform_name() {
        assert!(!platform_name().is_empty());
    }
}
