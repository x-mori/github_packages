require 'socket'
module XMori
  module PortCheck
    module_function
    def available?(port, host: '127.0.0.1')
      raise ArgumentError, 'port must be 0..65535' unless port.is_a?(Integer) && port.between?(0, 65_535)
      server = TCPServer.new(host, port)
      server.close
      true
    rescue Errno::EADDRINUSE, Errno::EACCES
      false
    end

    def next_free(start, host: '127.0.0.1', limit: 100)
      raise ArgumentError, 'invalid port range' unless start.is_a?(Integer) && start.between?(1, 65_535) && limit.is_a?(Integer) && limit.positive?
      (start..[start + limit - 1, 65_535].min).find { |port| available?(port, host: host) }
    end
  end
end
