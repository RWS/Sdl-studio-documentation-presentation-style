; -- setup.iss --
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING .ISS SCRIPT FILES!

[Setup]
AppName=SDL Studio Documentation Presentation Style
AppPublisher=SDL Community Developers
AppPublisherURL=https://community.sdl.com/
AppVersion=0.1.3.0
DisableDirPage = yes
DisableWelcomePage = yes
AllowNoIcons = yes
DefaultDirName={commonappdata}\EWSoftware\Sandcastle Help File Builder\Components and Plug-Ins\Studio.PresentationStyle\
Compression=lzma2
SolidCompression=yes
OutputDir=userdocs:Inno Setup Examples Output

[Files]
Source: ".\Studio.PresentationStyle\bin\Debug\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs

[UninstallDelete]
Type: filesandordirs; Name: "{commonappdata}\EWSoftware\Sandcastle Help File Builder\Components and Plug-Ins\Studio.PresentationStyle\"

