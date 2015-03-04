using System;
using System.Reflection;
using System.Resources;
using System.Runtime.InteropServices;

// General assembly information
[assembly: AssemblyProduct("Studio.PresentationStyle")]
[assembly: AssemblyTitle("Studio.PresentationStyle")]
[assembly: AssemblyDescription("A custom presentation style for Sandcastle")]
[assembly: AssemblyCompany("")]
[assembly: AssemblyCopyright("")]
[assembly: AssemblyCulture("")]
#if DEBUG
[assembly: AssemblyConfiguration("Debug")]
#else
[assembly: AssemblyConfiguration("Release")]
#endif

[assembly: ComVisible(false)]

[assembly: CLSCompliant(true)]

// Resources contained within the assembly are English
[assembly: NeutralResourcesLanguageAttribute("en")]

[assembly: AssemblyVersion("0.1.3.0")]
[assembly: AssemblyFileVersion("0.1.3.0")]

// This defines constants that can be used here and in the custom presentation style export attribute
internal static partial class AssemblyInfo
{
    // Product version
    public const string ProductVersion = "1.0.0.0";

    // Assembly copyright information
    public const string Copyright = "Copyright \xA9 2014, , All Rights Reserved.";
}
