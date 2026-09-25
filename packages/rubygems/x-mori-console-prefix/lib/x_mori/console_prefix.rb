require 'time'
module XMori
  class ConsolePrefix
    def initialize(namespace, io: $stdout, clock: -> { Time.now.utc })
      @namespace, @io, @clock = namespace, io, clock
      @mutex = Mutex.new
    end

    def log(message)
      line = "[#{@clock.call.iso8601}] [#{@namespace}] #{message}"
      @mutex.synchronize { @io.puts(line) }
      line
    end
  end
end
