module XMori
  module RedactSecrets
    PATTERN = /(?:password|passwd|token|secret|api[_-]?key|authorization)/i
    module_function

    def call(value, seen = {})
      case value
      when Hash
        return '[Circular]' if seen[value.object_id]
        seen[value.object_id] = true
        result = value.each_with_object({}) { |(key, item), out| out[key] = key.to_s.match?(PATTERN) ? '[REDACTED]' : call(item, seen) }
        seen.delete(value.object_id)
        result
      when Array
        return '[Circular]' if seen[value.object_id]
        seen[value.object_id] = true
        result = value.map { |item| call(item, seen) }
        seen.delete(value.object_id)
        result
      when String
        value.gsub(/Bearer\s+[^\s]+/i, 'Bearer [REDACTED]')
      else value
      end
    end
  end
end
