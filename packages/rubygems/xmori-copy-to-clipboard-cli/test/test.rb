require 'minitest/autorun'
require 'x_mori/copy_to_clipboard_cli'
class PackageTest < Minitest::Test
  def test_behavior
    assert_respond_to XMori::CopyToClipboardCli, :copy
  end
end
