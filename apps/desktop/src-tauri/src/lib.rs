use std::fs;
use std::path::PathBuf;

#[tauri::command]
fn export_trace(path: String, payload: String) -> Result<(), String> {
    let output = PathBuf::from(path);
    if let Some(parent) = output.parent() {
        fs::create_dir_all(parent).map_err(|error| error.to_string())?;
    }
    fs::write(output, payload).map_err(|error| error.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![export_trace])
        .run(tauri::generate_context!())
        .expect("error while running AlgoMotion desktop");
}

#[cfg(test)]
mod tests {
    use super::export_trace;

    #[test]
    fn writes_trace_payload() {
        let path = std::env::temp_dir().join("algomotion-desktop-trace.json");
        export_trace(path.to_string_lossy().to_string(), "{\"ok\":true}".into()).unwrap();
        assert_eq!(std::fs::read_to_string(&path).unwrap(), "{\"ok\":true}");
        let _ = std::fs::remove_file(path);
    }
}
