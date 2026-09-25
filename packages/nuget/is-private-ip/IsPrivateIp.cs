using System.Net;
namespace XMori.IsPrivateIp;
/// <summary>Classifies IP addresses as local or public.</summary>
public static class IpClassifier {
    /// <summary>Reports whether an address is loopback, private, link-local, or carrier-grade NAT.</summary>
    /// <param name="input">IPv4 or IPv6 text. Invalid text returns false.</param>
    /// <returns>True for a recognized local or internal address.</returns>
    /// <remarks>IPv4-mapped IPv6 addresses are checked as IPv4. This classification is not a complete SSRF defense because DNS and routing can change.</remarks>
    public static bool IsPrivate(string input) {
        if (!IPAddress.TryParse(input, out var address)) return false;
        if (address.IsIPv4MappedToIPv6) address = address.MapToIPv4();
        if (IPAddress.IsLoopback(address)) return true;
        var bytes = address.GetAddressBytes();
        if (bytes.Length == 4) return bytes[0] == 10 || bytes[0] == 0 || bytes[0] == 127 ||
            (bytes[0] == 172 && bytes[1] >= 16 && bytes[1] <= 31) ||
            (bytes[0] == 192 && bytes[1] == 168) ||
            (bytes[0] == 169 && bytes[1] == 254) ||
            (bytes[0] == 100 && bytes[1] >= 64 && bytes[1] <= 127);
        return (bytes[0] & 0xfe) == 0xfc || (bytes[0] == 0xfe && (bytes[1] & 0xc0) == 0x80);
    }
}
