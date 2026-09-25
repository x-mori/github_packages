using System.Net;
namespace XMori.IsPrivateIp;
public static class IpClassifier {
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
