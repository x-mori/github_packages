require 'uri'
module XMori
  module GitRepoInfo
    module_function
    def parse(remote)
      raise ArgumentError, 'remote is required' unless remote.is_a?(String)
      path = if remote.match?(/\Agit@github\.com:/i)
               remote.sub(/\Agit@github\.com:/i, '')
             else
               uri = URI.parse(remote)
               raise ArgumentError, 'expected github.com' unless uri.host&.downcase == 'github.com' && %w[https ssh git].include?(uri.scheme)
               uri.path.sub(%r{\A/}, '')
             end
      match = path.match(/\A([A-Za-z0-9-]+)\/([A-Za-z0-9_.-]+?)(?:\.git)?\/?\z/)
      raise ArgumentError, 'invalid GitHub remote' unless match
      { owner: match[1], repo: match[2] }
    rescue URI::InvalidURIError
      raise ArgumentError, 'invalid GitHub remote'
    end
  end
end
