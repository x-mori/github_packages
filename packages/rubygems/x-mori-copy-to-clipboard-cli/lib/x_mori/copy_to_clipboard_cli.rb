module XMori
  module CopyToClipboardCli
    module_function
    def copy(text)
      candidates = case RUBY_PLATFORM
                   when /darwin/ then [['pbcopy']]
                   when /mswin|mingw|cygwin/ then [['clip']]
                   else [['wl-copy'], ['xclip', '-selection', 'clipboard'], ['xsel', '--clipboard', '--input']]
                   end
      candidates.each do |command|
        begin
          IO.popen(command, 'w') { |pipe| pipe.write(text) }
          return true if $?.success?
        rescue Errno::ENOENT
          next
        end
      end
      raise RuntimeError, 'no working clipboard command found'
    end
  end
end
