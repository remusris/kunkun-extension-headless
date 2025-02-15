from pyvda import AppView, get_apps_by_z_order, VirtualDesktop, get_virtual_desktops
from comtypes.automation import COMError
import win32gui
import ctypes
import time
import subprocess
import keyboard

def convert_app_id(app_id):
    try:
        if app_id:
            return ctypes.wstring_at(app_id)
        return None
    except:
        return None

def get_notion_windows():
    windows = []
    all_windows = get_apps_by_z_order(current_desktop=False)
    
    for window in all_windows:
        try:
            app_id = convert_app_id(window.app_id)
            if app_id and 'notion.id' in app_id.lower():
                windows.append(window)
        except COMError:
            continue
    return windows

def move_new_notion_window():
    # Get the current active desktop (this will be our target desktop)
    target_desktop = VirtualDesktop.current()
    print(f"Target desktop is {target_desktop.number}")
    
    # Get list of existing Notion windows
    existing_windows = get_notion_windows()
    if not existing_windows:
        print("No Notion windows found")
        return
    
    # Get the desktop of the first Notion window
    notion_desktop = existing_windows[0].desktop
    print(f"Notion is on desktop {notion_desktop.number}")
    
    # Switch to the desktop where Notion is
    notion_desktop.go()
    print(f"Switched to desktop {notion_desktop.number}")
    time.sleep(0.5)  # Wait for desktop switch
    
    print(f"Existing Notion windows: {[w.hwnd for w in existing_windows]}")
    
    # Simulate pressing Ctrl+Shift+N
    keyboard.press_and_release('ctrl+shift+n')
    print("Pressed Ctrl+Shift+N")
    
    # Wait for new window to appear
    time.sleep(0.5)
    
    # Get new list of Notion windows
    new_windows = get_notion_windows()
    print(f"New Notion windows: {[w.hwnd for w in new_windows]}")
    
    # Find the new window by comparing lists
    new_window = None
    for window in new_windows:
        if window not in existing_windows:
            new_window = window
            break
    
    if new_window:
        print(f"New Notion window ID: {new_window.hwnd}")
        print(f"Current desktop: {new_window.desktop.number}")
        # Move it to our target desktop
        new_window.move(target_desktop)
        # Switch back to target desktop
        target_desktop.go()
        print(f"Moved new Notion window to Desktop {target_desktop.number}")
    else:
        print("New Notion window not found")

if __name__ == "__main__":
    # Give a moment to switch to Notion
    print("Please switch to Notion window...")
    time.sleep(0.5)
    move_new_notion_window()