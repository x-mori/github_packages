require 'minitest/autorun'
require 'x_mori/git_repo_info'
class PackageTest < Minitest::Test
  def test_behavior
    assert_equal({ owner: "x-mori", repo: "github_packages" }, XMori::GitRepoInfo.parse("git@github.com:x-mori/github_packages.git"))
  end
end
